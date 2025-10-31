import React, { useState } from "react";
import axios from "axios";
import ReactQRCode from "react-qr-code";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: ""
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [uniqueId, setUniqueId] = useState(""); // store uniqueId to show user
  const [paidEmail, setPaidEmail] = useState("");
  const paymentUrl = `/expire?uniqueId=${uniqueId}`;
//  const paymentUrl = `http://localhost:3000/expire?uniqueId=${uniqueId}`;
  // Payment validation schema (matching backend exactly)
  const paymentValidationSchema = {
    name: {
      validate: (value) => {
        const trimmed = value.trim();
        if (trimmed.length < 1) return "Name is required";
        if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(trimmed)) {
          return "Name must contain only letters and spaces";
        }
        return "";
      }
    },
    email: {
      validate: (value) => {
        const trimmed = value.trim();
        if (trimmed.length < 1) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          return "Invalid email format";
        }
        return "";
      }
    },
    contact: {
      validate: (value) => {
        const trimmed = value.trim();
        if (trimmed.length < 1) return "Contact number is required";
        if (!/^\d{10}$/.test(trimmed)) {
          return "Contact number must be 10 digits";
        }
        return "";
      }
    }
  };

  const validateField = (name, value) => {
    if (paymentValidationSchema[name]) {
      return paymentValidationSchema[name].validate(value);
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handlePayment = async () => {
    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);


    try {
      const { data } = await axios.post("/payment/pay", {
        name: formData.name,
        email: formData.email,
        contact: formData.contact
      });

      const { order, razorpayKeyId, uniqueId } = data;

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: "Eternia 2025 Elite Pass",
        description: "Unlock Elite Pass",
        order_id: order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.contact
        },
      handler: async function (response) {
  try {
    // Verify payment on backend
    await axios.post("/payment/verifyPayment", {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      uniqueId,
      userDetails: formData
    });

    // Show alert
    alert(`✅ Payment successful! Your Unique ID: ${uniqueId}`);
    setUniqueId(uniqueId);
    setPaidEmail(formData.email);
    setFormData({ name: "", email: "", contact: "" });
    setErrors({});

    // ✅ Send WhatsApp message
    // try {
    //   await axios.post("http://localhost:3000/payment/send-whatsapp", {
    //     contact: formData.contact,
    //     uniqueId
    //   });
    //   console.log("WhatsApp message sent successfully!");
    //     alert("Payment successful");
    // } catch (whatsappError) {
    //   console.error("WhatsApp send error:", whatsappError.response?.data || whatsappError.message);
    //   alert("Payment successful, but failed to send WhatsApp message.");
    // }

  } catch (error) {
    console.error("Payment verification error:", error);
    alert("Payment succeeded but verification failed. Contact support.");
  } finally {
    setIsProcessing(false);
  }
},

        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        },
        theme: {
          color: "#8B5CF6"
        }
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Payment gateway not available. Please try again later.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
      alert("Something went wrong, please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-6 py-12 relative">
      <div className="relative z-10 w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Unlock Elite Pass
          </h1>
          <p className="text-gray-300 text-lg">Register for ETERNIA 2025</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Registration Form</h2>
          <div className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter your name"
                className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500 bg-red-900/20"
                    : "border-gray-600 focus:ring-purple-500"
                }`}
              />
              {errors.name && (
                <div className="mt-2 p-2 bg-red-900/30 border border-red-500/50 rounded text-red-400 text-sm">
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500 bg-red-900/20"
                    : "border-gray-600 focus:ring-purple-500"
                }`}
              />
              {errors.email && (
                <div className="mt-2 p-2 bg-red-900/30 border border-red-500/50 rounded text-red-400 text-sm">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter your 10-digit mobile number"
                maxLength="10"
                className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.contact
                    ? "border-red-500 focus:ring-red-500 bg-red-900/20"
                    : "border-gray-600 focus:ring-purple-500"
                }`}
              />
              {errors.contact && (
                <div className="mt-2 p-2 bg-red-900/30 border border-red-500/50 rounded text-red-400 text-sm">
                  {errors.contact}
                </div>
              )}
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Register & Pay ₹500"
              )}
            </button>

            {/* Show Unique ID after payment */}
            {uniqueId && (
             <div className="mt-6 text-center">
                <p className="text-green-400 font-semibold mb-2">🎉 Payment Successful! Scan QR for Unique ID</p>
                <p className="text-green-400 font-semibold mb-2">Make sure to take a screenshot of the QR</p>
               <p> 🎉 Your Unique ID: <span className="text-white">{uniqueId}</span> </p>
               <p> 🎉 Email: <span className="text-white">{paidEmail}</span> </p>
               <ReactQRCode value={paymentUrl} size={200} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;