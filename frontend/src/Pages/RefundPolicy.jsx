import React from "react";
const RefundPolicy = () => {
  return (
    <section className="relative min-h-screen py-20 text-white overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
              REFUND & CANCELLATION POLICY
            </h2>
            <p className="text-gray-400 text-sm">Last Updated: October 2025</p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mx-auto mt-4" />
          </div>

          {/* Refund Policy sections */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">1. Registration Fees</h3>
              <p className="text-gray-200 leading-relaxed">
                All event registration and participation fees are non-refundable once paid, except in the following cases: The event is cancelled by the organizing committee, or duplicate payment occurs due to a technical error.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">2. Refund Process</h3>
              <p className="text-gray-200 leading-relaxed">
                Eligible participants must request a refund by emailing eternia@aiimsguwahati.ac.in within 7 days of payment. Refunds, if approved, will be credited to the original payment method within 10–15 working days.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">3. Event Changes or Cancellations</h3>
              <p className="text-gray-200 leading-relaxed">
                The organizing committee reserves the right to modify, postpone, or cancel events due to unavoidable circumstances such as weather, administrative orders, or safety reasons. Participants will be duly notified, and refunds will be processed where applicable.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">4. No-Show Policy</h3>
              <p className="text-gray-200 leading-relaxed">
                Participants who fail to attend an event after registration will not be eligible for any refund or transfer.
              </p>
            </div>

            {/* Contact Information Section */}
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-lg p-8 border border-purple-400/30 mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-center text-purple-200">Contact Information</h3>
              <p className="text-gray-200 leading-relaxed mb-4 text-center">
                For any queries regarding Terms, Privacy, or Refunds, please contact:
              </p>
              <div className="space-y-3 text-gray-200">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-semibold min-w-[80px]">Email:</span>
                  <a href="mailto:eternia@aiimsguwahati.ac.in" className="hover:text-purple-300 transition-colors">
                    eternia@aiimsguwahati.ac.in
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-semibold min-w-[80px]">Website:</span>
                  <a href="https://aiimsguwahatiEternia2025.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
                    https://aiimsguwahatiEternia2025.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-semibold min-w-[80px]">Address:</span>
                  <span>All India Institute of Medical Sciences (AIIMS), Guwahati, Assam, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </section>
  )
};
export default RefundPolicy;