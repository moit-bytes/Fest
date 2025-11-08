const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
// const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();
// const { authenticateUserJwt } = require('../middleware/auth'); // ✅ if auth exports an object
const { Payment } = require('../db/db');
const { EventPayment } = require('../db/db');
const crypto = require('crypto');
const { z } = require("zod");
const axios = require('axios');
const Response = require('../utils/response');
const paymentValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Name must contain only letters and spaces"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),
  contact: z
    .string()
    .trim()
    .min(1, "Contact number is required")
    .regex(/^\d{10}$/, "Contact number must be 10 digits"),
});
const sportPaymentValidationSchema = z
  .object({
    categoryName: z.string().min(1, "Category name is required"),
    subCategory: z.string().min(1, "Subcategory is required"),
    teamName: z.string().optional(),
    individualName: z.string().optional(),
    leaderName: z.string().optional(),
    mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
    institutionName: z.string().optional(),
    email: z.string().email("Invalid email format"),
    aadhaarCard: z.string().optional(),
    collegeId: z.string().optional(),
    amount: z.number(),
  })
  .superRefine((data, ctx) => {
    // Either teamName or individualName must exist
    if (!data.teamName && !data.individualName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either teamName or individualName is required.",
        path: ["teamName"],
      });
    }

    // If teamName exists, leaderName is required
    if (data.teamName && !data.leaderName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "leaderName is required when teamName is provided.",
        path: ["leaderName"],
      });
    }
    if (!data.teamName && data.leaderName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "TeamName is required when LeaderName is provided.",
        path: ["teamname"],
      });
    }
    // Aadhaar or CollegeID logic
    if (data.institutionName) {
      if (!data.collegeId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "collegeId is required when institutionName is provided.",
          path: ["collegeId"],
        });
      }
    }
    if (!data.aadhaarCard) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "aadhaarCard is required when institutionName is not provided.",
        path: ["aadhaarCard"],
      });
    }

  });

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });
const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;
const PAYU_MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT;

const PAYU_BASE_URL = process.env.PAYU_BASE_URL || "https://test.payu.in"; // test


router.post('/pay', async (req, res) => {
  try {
    const { name, email, contact } = paymentValidationSchema.parse(req.body);

    // Optional: prevent duplicate initiated/expired payments
    const existingIssuedPayment = await Payment.findOne({
      email,
      status: { $in: ['issued', 'expired'] }
    });

    if (existingIssuedPayment) {
      return res
        .status(400)
        .json(new Response(400, "This email has already completed a payment.", false));
    }


    const txnid = uuidv4().replace(/-/g, '').slice(0, 20);
    const productinfo = "Eternia Pass";
    const amountINR = 500;

    // ✅ Correct PayU test hash formula (single hash)
    const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amountINR}|${productinfo}|${name}|${email}|||||||||||${PAYU_MERCHANT_SALT}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    // ✅ Log to verify correctness (optional)
    console.log("PayU Hash String:", hashString);
    console.log("Generated Hash:", hash);

    let paymentDoc = await Payment.findOne({
      email,
      status: { $in: ['initiated', 'failed'] }
    });

    if (paymentDoc) {
      // ✅ Update existing payment document
      paymentDoc.name = name;
      paymentDoc.contact = contact;
      paymentDoc.amount = amountINR;
      paymentDoc.uniqueId = txnid;
      paymentDoc.status = 'initiated';
      await paymentDoc.save();
    } else {
      // ✅ Create new payment document
      paymentDoc = new Payment({
        name,
        email,
        contact,
        amount: amountINR,
        uniqueId: txnid,
        status: 'initiated'
      });
      await paymentDoc.save();
    }

    const payuUrl = `${PAYU_BASE_URL}/_payment`;

    const payuData = {
      key: PAYU_MERCHANT_KEY,
      txnid,
      amount: amountINR,
      productinfo,
      firstname: name,
      email,
      phone: contact,
      surl: `https://aiimsguwahatieternia2025.com/payment/verifyPayment`,
      furl: `https://aiimsguwahatieternia2025.com/payment/verifyPayment`,
      hash,
      udf1: '',
      udf2: '',
      udf3: '',
      udf4: '',
      udf5: ''
    };

    return res
      .status(200)
      .json(new Response(200, "Order created successfully", true, {
        payuUrl,
        payuData,
        // uniqueId: txnid
        // ${process.env.BASE_URL}
      }));

  } catch (err) {
    if (err.name === "ZodError") {
      return res
        .status(400)
        .json(new Response(400, err.errors?.map(e => e.message).join(", "), false));
    }
    console.error(err);
    return res
      .status(500)
      .json(new Response(500, "Internal Server Error", false, err.message));
  }
});
router.post("/sportspay", async (req, res) => {
  try {
    // ✅ Validate input using Zod schema
    const validatedData = sportPaymentValidationSchema.parse(req.body);
    const {
      categoryName,
      subCategory,
      teamName,
      individualName,
      leaderName,
      mobileNumber,
      institutionName,
      email,
      aadhaarCard,
      collegeId,
      amount,
    } = validatedData;

    // ✅ Check for existing payment with same email and issued status
    // const existingIssuedPayment = await EventPayment.findOne({
    //   email,
    //   status: { $in: ["issued", "expired"] },
    // });

    // if (existingIssuedPayment) {
    //   return res
    //     .status(400)
    //     .json(
    //       new Response(
    //         400,
    //         "This email has already completed a sports payment.",
    //         false
    //       )
    //     );
    // }

    // ✅ Generate unique transaction ID
    const txnid = uuidv4().replace(/-/g, "").slice(0, 20);
    const productinfo = "Sports Event";
    const amountINR = amount;
    const firstname = teamName || individualName;
    const teamNameConst = teamName || "";

    if (!amountINR || amountINR === 0) {
      eventPaymentEmail(email, firstname, subCategory, teamName, amount);
      return res
        .status(200)
        .json(
          new Response(200, "Success", false, {
            "emailSent": true
          })
        );;
    }

    // ✅ PayU hash generation
    const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amountINR}|${productinfo}|${firstname}|${email}|${teamNameConst}|${subCategory || ""}|||||||||${PAYU_MERCHANT_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");


    // ✅ Find existing pending payment
    let paymentDoc = await EventPayment.findOne({
      email,
      status: { $in: ["initiated", "failed"] },
    });

    if (paymentDoc) {
      // Update existing record
      Object.assign(paymentDoc, {
        categoryName,
        subCategory,
        teamName,
        individualName,
        leaderName,
        mobileNumber,
        institutionName,
        aadhaarCard,
        collegeId,
        amount: amountINR,
        uniqueId: txnid,
        status: "initiated",
      });
      await paymentDoc.save();
    } else {
      // Create new record
      paymentDoc = new EventPayment({
        categoryName,
        subCategory,
        teamName,
        individualName,
        leaderName,
        mobileNumber,
        institutionName,
        aadhaarCard,
        collegeId,
        email,
        amount: amountINR,
        uniqueId: txnid,
        status: "initiated",
      });
      await paymentDoc.save();
    }

    // ✅ PayU data payload
    const payuUrl = `${PAYU_BASE_URL}/_payment`;
    const payuData = {
      key: PAYU_MERCHANT_KEY,
      txnid,
      amount: amountINR,
      productinfo,
      firstname: teamName || individualName,
      email,
      phone: mobileNumber,
      surl: `https://aiimsguwahatieternia2025.com/payment/eventverifyPayment`,
      furl: `https://aiimsguwahatieternia2025.com/payment/eventverifyPayment`,
      hash,
      udf1: teamNameConst,
      udf2: subCategory || "",
      udf3: "",
      udf4: "",
      udf5: "",
    };

    return res
      .status(200)
      .json(
        new Response(200, "Sports payment initiated successfully", true, {
          payuUrl,
          payuData,
        })
      );
  } catch (err) {
    if (err.name === "ZodError") {
      return res
        .status(400)
        .json(
          new Response(
            400,
            err.errors?.map((e) => e.message).join(", "),
            false
          )
        );
    }
    console.error(err);
    return res
      .status(500)
      .json(
        new Response(500, "Internal Server Error", false, err.message)
      );
  }
});
// async function sendPaymentEmail(toEmail, uniqueId) {
//   try {
//     if (!uniqueId) throw new Error("Unique ID is missing");

//     // ✅ Create the URL to encode in QR
//     const qrUrl = `https://aiimsguwahatieternia2025.com/expire?uniqueId=${uniqueId}`;

//     // 1️⃣ Generate QR code as a Data URL
//     const qrCodeDataUrl = await QRCode.toDataURL(qrUrl, {
//       errorCorrectionLevel: "H",
//       type: "image/png",
//       width: 300,
//     });

//     // 2️⃣ Configure nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // 3️⃣ Compose email
//     const mailOptions = {
//       from: `"Event Team" <${process.env.EMAIL_USER}>`,
//       to: toEmail,
//       subject: "Payment Successful - Your Unique ID",
//       html: `
//         <h3>Payment Successful!</h3>
//         <p>Your Unique ID is: <strong>${uniqueId}</strong></p>
//         <p>Scan this QR code to access your payment details:</p>
//         <img src="${qrCodeDataUrl}" alt="QR Code" />
//       `,
//     };

//     // 4️⃣ Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: " + info.response);
//   } catch (err) {
//     console.error("Error sending payment email:", err);
//   }
// }
async function sendPaymentEmail(toEmail, uniqueId) {
  try {
    if (!uniqueId) throw new Error("Unique ID is missing");

    const qrUrl = `https://aiimsguwahatieternia2025.com/expire?uniqueId=${uniqueId}`;

    // Generate QR code as a buffer
    const qrCodeBuffer = await QRCode.toBuffer(qrUrl, {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 300,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Event Team" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Payment Successful - Your Unique ID",
      html: `
        <h3>Payment Successful!</h3>
        <p>Your Unique ID is: <strong>${uniqueId}</strong></p>
        <p>Scan the attached QR code to access your payment details.</p>
      `,
      attachments: [
        {
          filename: "qr-code.png",
          content: qrCodeBuffer,
          cid: "qrcode", // Content ID for embedding
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (err) {
    console.error("Error sending payment email:", err);
  }
}

function getRegistrationForm(eventName, teamName) {
  const name = eventName.trim().toLowerCase();

  if (name.includes("ocean jam") || name.includes("battle of the bands")) {
    return "https://forms.gle/8fW1UhuEorkafYhUA";

  } else if (name.includes("syncopation") || name.includes("dance")) {
    return "https://forms.gle/AJrHYPzFcf6GL5cv6";

  } else if (name.includes("deep blue script") || name.includes("drama")) {
    return "https://forms.gle/nAcq9yp5SvYhDSG37";

  } else if (name.includes("geek cheek gala")) {
    return "https://forms.gle/c7TTQdG1dcNHzjWz56";

  } else if (name.includes("rhythmixia") || name.includes("instrumental")) {
    return "https://forms.gle/eKJ8pbZCXzeTtGp69";

  } else if (name.includes("crescendo") || name.includes("singing")) {
    return "https://forms.gle/DucHozY98LCb6NQt9";

  } else if (name.includes("enchante") || name.includes("fashion")) {
    return "https://docs.google.com/forms/d/e/1FAIpQLSduZgP4yNtQFUF-Oga138uom9rN1jaxEGrxHLb8525cUL_S-A/viewform";
  } else {
    return teamName && teamName !== "" ? "https://forms.gle/ANPRCwxepFRfotSS7" : "https://forms.gle/x67zXrT6xPnAcikz7"
  }
}


async function eventPaymentEmail(toEmail, participantName, eventName, teamName, amount) {
  try {
    // ✅ Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Compose simple congratulations email
    const mailOptions = {
      from: `"Event Team" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "ETERNIA 2025 || Congratulations! Payment Successful. 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f8fa; margin: 0; padding: 0; color: #333333;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 650px; margin: 30px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <tr>
      <td style="background-color: #004aad; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">AIIMS GUWAHATI</h1>
        <p style="color: #d9e6ff; margin: 5px 0 0; font-size: 14px;">Team Eternia</p>
      </td>
    </tr>

    <tr>
      <td style="padding: 30px;">
        <p style="font-size: 16px; color: #333;"><strong>🎉 Congratulations ${participantName ? participantName : ""}${teamName && teamName !== "" ? `(TEAM: ${teamName})` : ""}!</strong></p>

        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          Greetings from <strong>AIIMS Guwahati!</strong> 🌟
        </p>

        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          We are happy to inform you that your registration for the <strong>[${eventName}]</strong> has been successfully completed, and we have received your payment of <strong>₹${amount}</strong>.
        </p>

        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          Thank you for being a part of this event — we appreciate your enthusiasm and participation. We are excited to have you compete and showcase your talent!
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;" />

        <h3 style="color: #004aad; font-size: 17px; margin-bottom: 8px;">📍 Venue</h3>
        <p style="font-size: 15px; color: #333; line-height: 1.6;">
          <strong>AIIMS Guwahati</strong><br>
          <a href="https://maps.app.goo.gl/zRQwQRxFqkYGN8po7?g_st=ipc" style="color: #004aad; text-decoration: none; cursor: pointer;">View on Google Maps</a>
        </p>

         <p style="font-size: 24px;">
            <a href="${getRegistrationForm(eventName, teamName)}" target="_blank" style="color: blue; text-decoration: underline; font-weight: 500; cursor: pointer;">
              Please fill out this Google Form mandatorily: Click Here
            </a>
          </p>

        <p style="font-size: 15px; color: #333; line-height: 1.6;">
          Please make sure to <strong>carry a valid ID document</strong> for identification and <strong>go through the rulebook</strong> once before the competition.
        </p>

        <h3 style="color: #004aad; font-size: 17px; margin-bottom: 8px;">📞 Contact Us</h3>
        <p style="font-size: 15px; line-height: 1.6;">
          📧 Email: <a href="mailto:aiimseternia@gmail.com" style="color: #004aad; text-decoration: none;">techeternia25@gmail.com</a><br>
          📞 Phone: <a href="tel:7429775590" style="color: #004aad; text-decoration: none;">7429775590</a>,
          <a href="tel:7339940711" style="color: #004aad; text-decoration: none;">7339940711</a>
        </p>

        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          We wish you all the best for the competition! 💫<br>
          Looking forward to your active participation.
        </p>

        <p style="font-size: 15px; color: #333; margin-top: 25px;">
          Warm regards,<br>
          <strong>Team Eternia</strong><br>
          <strong>AIIMS Guwahati</strong>
        </p>
      </td>
    </tr>

    <tr>
      <td style="background-color: #f0f3f7; text-align: center; padding: 15px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        <p style="font-size: 12px; color: #666; margin: 0;">
          © 2025 Team Eternia, AIIMS Guwahati. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
          
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            See you at the event! 🎊
          </p>
        </div>
      `,
    };

    // ✅ Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("Error sending payment email:", err);
    throw err;
  }
}

// router.post("/verifyPayment", async (req, res) => {
//   try {
//     const {
//       mihpayid,
//       status,
//       txnid,
//       hash,
//       key,
//       amount,
//       productinfo,
//       firstname,
//       email
//     } = req.body;

//     // ✅ Recreate hash to verify authenticity
//     const hashSequence = `${PAYU_MERCHANT_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
//     const expectedHash = crypto.createHash('sha512').update(hashSequence).digest('hex');
//     let redirectUrl = `${process.env.FRONTEND_URL}`;
//     if (hash === expectedHash && status === 'success') {
//       await Payment.findOneAndUpdate(
//         { uniqueId: txnid },
//         { status: "issued", payuPaymentId: mihpayid },
//         { new: true }
//       );

//       return res
//         .status(200)
//         .json(new Response(200, "Payment verified successfully", true, { txnid, mihpayid }));
//     } else {
//       await Payment.findOneAndUpdate(
//         { uniqueId: txnid },
//         { status: "failed" }
//       );
//       return res
//         .status(400)
//         .json(new Response(400, "Invalid hash or failed payment", false));
//     }
//   } catch (err) {
//     console.error("Error verifying payment:", err);
//     if (req.body.txnid) {
//       await Payment.findOneAndUpdate(
//         { uniqueId: req.body.txnid },
//         { status: "failed" }
//       );
//     }
//     return res
//       .status(500)
//       .json(new Response(500, "Payment verification failed", false, err.message));
//   }
// });
router.post("/verifyPayment", async (req, res) => {
  try {
    const {
      mihpayid,
      status,
      txnid,
      hash,
      key,
      amount,
      productinfo,
      firstname,
      email
    } = req.body;

    const hashSequence = `${PAYU_MERCHANT_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    const expectedHash = crypto.createHash("sha512").update(hashSequence).digest("hex");

    let redirectUrl = `/`;

    if (hash === expectedHash && status === "success") {
      await Payment.findOneAndUpdate(
        { uniqueId: txnid },
        { status: "issued", payuPaymentId: mihpayid },
        { new: true }
      );
      sendPaymentEmail(email, txnid);
      // ✅ Redirect with success params
      redirectUrl += `?success=true&uniqueId=${txnid}&email=${encodeURIComponent(email)}`;
    } else {
      await Payment.findOneAndUpdate(
        { uniqueId: txnid },
        { status: "failed" }
      );
      // ❌ Redirect with error params
      redirectUrl += `?success=false&message=Payment failed or hash mismatch`;
    }

    return res.redirect(redirectUrl);

  } catch (err) {
    console.error("Error verifying payment:", err);

    const redirectUrl = `/register?success=false&message=${encodeURIComponent(err.message)}`;
    return res.redirect(redirectUrl);
  }
});
//verifyevent
router.post("/eventverifyPayment", async (req, res) => {
  try {
    const {
      mihpayid,
      status,
      txnid,
      hash: receivedHash,
      amount,
      productinfo,
      firstname,
      email,
      udf1: teamName,
      udf2: subCategory
    } = req.body;

    const hashString = `${PAYU_MERCHANT_SALT}|${status}||||||||${subCategory || ""}|${teamName || ""}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_MERCHANT_KEY}`;
    const expectedHash = crypto.createHash("sha512").update(hashString).digest("hex");

    let redirectUrl = `/`;

    if (receivedHash === expectedHash && status === "success") {
      await EventPayment.findOneAndUpdate(
        { uniqueId: txnid },
        { status: "issued", payuPaymentId: mihpayid },
        { new: true }
      );

      eventPaymentEmail(email, firstname, subCategory, teamName, amount);

      redirectUrl += `?success=true&uniqueId=${txnid}&email=${encodeURIComponent(email)}`;
    } else {
      await EventPayment.findOneAndUpdate(
        { uniqueId: txnid },
        { status: "failed" }
      );

      redirectUrl += `?success=false&message=Payment failed or hash mismatch`;
    }

    return res.redirect(redirectUrl);

  } catch (err) {
    console.error("Error verifying payment:", err);
    const redirectUrl = `/?success=false&message=${encodeURIComponent(err.message)}`;
    return res.redirect(redirectUrl);
  }
});


router.post("/send-whatsapp", async (req, res) => {
  const { contact, uniqueId } = req.body;

  const paymentUrl = `/expire?uniqueId=${uniqueId}`;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: `91${contact}`, // prefix with country code (India = 91)
        type: "text",
        text: {
          body: `🎉 Congratulations! Your payment was successful.\n\nUnique ID: ${uniqueId}\nScan your QR: ${paymentUrl}`
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("success");
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("WhatsApp API Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Failed to send WhatsApp message" });
  }
});

module.exports = router;
