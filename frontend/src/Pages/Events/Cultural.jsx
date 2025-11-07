import React, { useState, useEffect } from "react";
import axios from "axios";

const Cultural = () => {
    const [formData, setFormData] = useState({
        teamName: "",
        individualName: "",
        leaderName: "",
        mobileNumber: "",
        institutionName: "",
        collegeId: "",
        email: "",
        aadhaarCard: "",
        categoryName: "",
        subCategory: "",
    });

    const [subcategories, setSubcategories] = useState([]);
    const [selectedFee, setSelectedFee] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isTeamEvent, setIsTeamEvent] = useState(false);
    const [hasInstitution, setHasInstitution] = useState(false);

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentFailed, setPaymentFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    // ✅ Fetch Sports Category and Subcategories
    useEffect(() => {
        const fetchSportsData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/events/cultural");
                if (data.isSuccess && data.data) {
                    setFormData((prev) => ({ ...prev, categoryName: data.data.category }));
                    setSubcategories(data.data.subcategories);
                }
            } catch (err) {
                console.error("Error fetching sports category:", err);
            }
        };
        fetchSportsData();
    }, []);

    // ✅ Handle subcategory selection (auto detect team/individual)
    const handleSubcategoryChange = (e) => {
        const selected = subcategories.find((s) => s.name === e.target.value);

        setFormData((prev) => ({
            ...prev,
            subCategory: selected?.name || "",
            teamName: "",
            leaderName: "",
            individualName: "",
        }));

        setSelectedFee(selected?.paymentAmount || "");
        setIsTeamEvent(selected?.team || false); // auto detect team event
    };

    // ✅ Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (validationErrors[name]) {
            setValidationErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // ✅ Validate form
    const validateForm = () => {
        const errors = {};

        if (!formData.categoryName) errors.categoryName = "Category is required";
        if (!formData.subCategory) errors.subCategory = "Subcategory is required";

        if (isTeamEvent) {
            if (!formData.teamName) errors.teamName = "Team Name is required";
            if (!formData.leaderName) errors.leaderName = "Leader Name is required";
        } else {
            if (!formData.individualName)
                errors.individualName = "Individual Name is required";
        }

        if (!formData.mobileNumber) {
            errors.mobileNumber = "Mobile number is required";
        } else if (formData.mobileNumber.length < 10) {
            errors.mobileNumber = "Mobile number must be at least 10 digits";
        }

        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email format";
        }

        if (hasInstitution) {
            if (!formData.institutionName) {
                errors.institutionName = "Institution name is required";
            }
            if (!formData.collegeId) {
                errors.collegeId = "College ID is required";
            }
        } else {
            if (!formData.aadhaarCard) {
                errors.aadhaarCard = "Aadhaar Card is required";
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // ✅ Confirm modal open
    const handleConfirmOpen = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setShowConfirmModal(true);
    };

    // ✅ Proceed to payment after confirmation
    const handlePayment = async () => {
        setShowConfirmModal(false);
        setIsProcessing(true);
        setPaymentSuccess(false);

        try {
            const paymentData = {
                categoryName: formData.categoryName,
                subCategory: formData.subCategory,
                mobileNumber: formData.mobileNumber,
                email: formData.email,
                amount: selectedFee,
            };

            if (formData.teamName) paymentData.teamName = formData.teamName;
            if (formData.individualName)
                paymentData.individualName = formData.individualName;
            if (formData.leaderName) paymentData.leaderName = formData.leaderName;
            if (formData.institutionName)
                paymentData.institutionName = formData.institutionName;
            if (formData.collegeId) paymentData.collegeId = formData.collegeId;
            if (formData.aadhaarCard) paymentData.aadhaarCard = formData.aadhaarCard;

            const { data } = await axios.post(
                "/payment/sportspay",
                paymentData
            );

            const { payuUrl, payuData } = data.data;

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
            setErrorMessage(err.response?.data?.message || "Something went wrong.");
            setPaymentFailed(true);
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="w-full max-w-2xl mx-auto bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-4xl font-bold text-white text-center mb-6">
                    Cultural Event Registration
                </h1>

                {!paymentSuccess ? (
                    <form className="space-y-5" onSubmit={handleConfirmOpen}>
                        {/* Category */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                value={formData.categoryName}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-700/40 border border-gray-600 rounded-lg text-white cursor-not-allowed"
                                placeholder="Loading category..."
                            />
                        </div>

                        {/* Subcategory */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Subcategory *
                            </label>
                            <select
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleSubcategoryChange}
                                className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none ${validationErrors.subCategory
                                    ? "border-red-500"
                                    : "border-gray-600"
                                    }`}
                            >
                                <option value="">Select Subcategory</option>
                                {subcategories.map((sub) => (
                                    <option key={sub._id} value={sub.name}>
                                        {sub.name} - ₹{sub.paymentAmount}
                                    </option>
                                ))}
                            </select>
                            {validationErrors.subCategory && (
                                <p className="text-red-400 text-xs mt-1">
                                    {validationErrors.subCategory}
                                </p>
                            )}
                            {/* Hint for event type */}
                            {formData.subCategory && (
                                <p className="text-sm text-gray-400 mt-1 italic">
                                    {isTeamEvent
                                        ? "This is a team event."
                                        : "This is an individual event."}
                                </p>
                            )}
                        </div>

                        {/* Fee */}
                        {selectedFee && (
                            <div className="text-center text-xl text-green-400 font-semibold py-2">
                                💰 Registration Fee: ₹{selectedFee}
                            </div>
                        )}

                        {/* Team fields */}
                        {isTeamEvent && (
                            <>
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Team Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="teamName"
                                        value={formData.teamName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your team name"
                                        className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none ${validationErrors.teamName
                                            ? "border-red-500"
                                            : "border-gray-600"
                                            }`}
                                    />
                                    {validationErrors.teamName && (
                                        <p className="text-red-400 text-xs mt-1">
                                            {validationErrors.teamName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Leader Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="leaderName"
                                        value={formData.leaderName}
                                        onChange={handleInputChange}
                                        placeholder="Enter leader name"
                                        className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none ${validationErrors.leaderName
                                            ? "border-red-500"
                                            : "border-gray-600"
                                            }`}
                                    />
                                    {validationErrors.leaderName && (
                                        <p className="text-red-400 text-xs mt-1">
                                            {validationErrors.leaderName}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Individual field */}
                        {!isTeamEvent && (
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Individual Name *
                                </label>
                                <input
                                    type="text"
                                    name="individualName"
                                    value={formData.individualName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none ${validationErrors.individualName
                                        ? "border-red-500"
                                        : "border-gray-600"
                                        }`}
                                />
                                {validationErrors.individualName && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {validationErrors.individualName}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Mobile Number *
                            </label>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                placeholder="10-digit mobile number"
                                maxLength="10"
                                className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none ${validationErrors.mobileNumber
                                    ? "border-red-500"
                                    : "border-gray-600"
                                    }`}
                            />
                            {validationErrors.mobileNumber && (
                                <p className="text-red-400 text-xs mt-1">
                                    {validationErrors.mobileNumber}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none ${validationErrors.email ? "border-red-500" : "border-gray-600"
                                    }`}
                            />
                            {validationErrors.email && (
                                <p className="text-red-400 text-xs mt-1">
                                    {validationErrors.email}
                                </p>
                            )}
                        </div>

                        {/* Institution Checkbox */}
                        <div className="flex items-center gap-4 bg-gray-700/30 p-4 rounded-lg">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={hasInstitution}
                                    onChange={(e) => {
                                        setHasInstitution(e.target.checked);
                                        if (!e.target.checked) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                institutionName: "",
                                                collegeId: "",
                                            }));
                                        } else {
                                            setFormData((prev) => ({ ...prev, aadhaarCard: "" }));
                                        }
                                    }}
                                    className="w-4 h-4"
                                />
                                <span className="text-gray-300">
                                    I am from an Institution/College
                                </span>
                            </label>
                        </div>

                        {/* Institution Name */}
                        {hasInstitution && (
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Institution Name *
                                </label>
                                <input
                                    type="text"
                                    name="institutionName"
                                    value={formData.institutionName}
                                    onChange={handleInputChange}
                                    placeholder="Enter institution name"
                                    className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none ${validationErrors.institutionName
                                        ? "border-red-500"
                                        : "border-gray-600"
                                        }`}
                                />
                                {validationErrors.institutionName && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {validationErrors.institutionName}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* College ID */}
                        {hasInstitution && (
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    College ID *
                                </label>
                                <input
                                    type="text"
                                    name="collegeId"
                                    value={formData.collegeId}
                                    onChange={handleInputChange}
                                    placeholder="Enter your college ID"
                                    className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none ${validationErrors.collegeId
                                        ? "border-red-500"
                                        : "border-gray-600"
                                        }`}
                                />
                                {validationErrors.collegeId && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {validationErrors.collegeId}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Aadhaar */}
                        {!hasInstitution && (
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Aadhaar Card Number *
                                </label>
                                <input
                                    type="text"
                                    name="aadhaarCard"
                                    value={formData.aadhaarCard}
                                    onChange={handleInputChange}
                                    placeholder="Enter 12-digit Aadhaar number"
                                    maxLength="12"
                                    className={`w-full px-4 py-3 bg-gray-700/60 border rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none ${validationErrors.aadhaarCard
                                        ? "border-red-500"
                                        : "border-gray-600"
                                        }`}
                                />
                                {validationErrors.aadhaarCard && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {validationErrors.aadhaarCard}
                                    </p>
                                )}
                            </div>
                        )}

                        {paymentFailed && errorMessage && (
                            <div className="text-center text-red-400 bg-red-900/20 border border-red-500/50 rounded-lg p-3">
                                ⚠️ {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? "Processing..." : "Register & Pay"}
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Payment Successful!
                        </h2>
                        <p className="text-gray-300">Thank you for registering.</p>
                    </div>
                )}
            </div>

            {/* ✅ Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4">
                    <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md border border-gray-700 shadow-xl">
                        <h2 className="text-xl font-bold text-white mb-4 text-center">Confirm Registration</h2>

                        <div className="space-y-2 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Category:</span>
                                <span className="text-white font-semibold">{formData.categoryName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Sport:</span>
                                <span className="text-white font-semibold">{formData.subCategory}</span>
                            </div>
                            {formData.teamName && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Team:</span>
                                    <span className="text-white font-semibold">{formData.teamName}</span>
                                </div>
                            )}
                            {formData.individualName && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Name:</span>
                                    <span className="text-white font-semibold">{formData.individualName}</span>
                                </div>
                            )}
                            {formData.leaderName && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Leader:</span>
                                    <span className="text-white font-semibold">{formData.leaderName}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-400">Email:</span>
                                <span className="text-white font-semibold">{formData.email}</span>
                            </div>
                        </div>

                        <p className="text-green-400 text-lg font-semibold mb-6 text-center">
                            Registration Fee: ₹{selectedFee}
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePayment}
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Confirm & Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cultural;