import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQRCode from "react-qr-code";
import { useLocation } from "react-router-dom";

const RegisterPage = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: ""
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [paidEmail, setPaidEmail] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const paymentUrl = `/expire?uniqueId=${uniqueId}`;

  // ✅ Check PayU redirect result
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get("success");
    const uniqueIdParam = params.get("uniqueId");
    const emailParam = params.get("email");
    const messageParam = params.get("message");

    if (success === "true" && uniqueIdParam && emailParam) {
      setPaymentSuccess(true);
      setPaymentFailed(false);
      setUniqueId(uniqueIdParam);
      setPaidEmail(emailParam);
      setErrorMessage("");
    } else if (success === "false") {
      setPaymentSuccess(false);
      setPaymentFailed(true);
      setErrorMessage(messageParam || "Payment failed. Please try again.");
      setUniqueId("");
      setPaidEmail("");
    }
  }, [location]);

  // ✅ Validation schema
  const paymentValidationSchema = {
    name: {
      validate: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "Name is required";
        if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(trimmed))
          return "Name must contain only letters and spaces";
        return "";
      }
    },
    email: {
      validate: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
          return "Invalid email format";
        return "";
      }
    },
    contact: {
      validate: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "Contact number is required";
        if (!/^[0-9]{10}$/.test(trimmed))
          return "Contact number must be 10 digits";
        return "";
      }
    }
  };

  const validateField = (name, value) => {
    return paymentValidationSchema[name]?.validate(value) || "";
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }

    if (errorMessage) {
      setErrorMessage("");
      setPaymentFailed(false);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  // ✅ PayU Payment Handler
  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setErrorMessage("");
    setPaymentSuccess(false);
    setPaymentFailed(false);

    try {
      const { data } = await axios.post("/payment/pay", {
        name: formData.name,
        email: formData.email,
        contact: formData.contact
      });

      const { payuUrl, payuData } = data.data;

      // ✅ Create hidden form for PayU redirect
      const form = document.createElement("form");
      form.method = "POST";
      form.action = payuUrl;

      Object.entries(payuData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);

      const errorMsg =
        err.response?.data?.message || "Something went wrong. Please try again.";
      setErrorMessage(errorMsg);

      setPaymentSuccess(false);
      setPaymentFailed(true);
      setUniqueId("");
      setPaidEmail("");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative">
      <div className="relative z-10 w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Unlock Elite Pass
          </h1>
          <p className="text-gray-300 text-lg">Register for ETERNIA 2025</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          {/* ✅ Success Section - Show ONLY when payment is successful */}
          {paymentSuccess && uniqueId && paidEmail ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                Registration Complete!
              </h2>
              <div className="p-6 bg-green-900/20 border border-green-500/50 rounded-lg">
                <div className="text-center">
                  <p className="text-green-400 font-semibold text-xl mb-2">
                    🎉 Payment Successful!
                  </p>
                  <p className="text-green-400 font-semibold mb-4">
                    Make sure to take a screenshot of the QR code
                  </p>
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    <ReactQRCode value={paymentUrl} size={200} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      Your Unique ID:{" "}
                      <span className="text-white font-bold">{uniqueId}</span>
                    </p>
                    <p className="text-gray-300">
                      Email:{" "}
                      <span className="text-white font-bold">{paidEmail}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // ✅ Show form when payment hasn't succeeded
            <>
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Registration Form
              </h2>

              <div className="space-y-6">
                {/* Error Message - Show for failed payments or API errors */}
                {(errorMessage || paymentFailed) && (
                  <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm">
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2">⚠️</span>
                      <span>{errorMessage || "Payment failed. Please try again."}</span>
                    </div>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Name
                  </label>
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
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
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
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Contact Number
                  </label>
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

                {/* Pay Button */}
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
                    "Register & Pay ₹5"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;