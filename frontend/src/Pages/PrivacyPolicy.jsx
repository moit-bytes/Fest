import React from "react";
const PrivacyPolicy = () => {
  return (
    <section className="relative min-h-screen py-20 text-white overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
              PRIVACY POLICY
            </h2>
            <p className="text-gray-400 text-sm">Last Updated: October 2025</p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mx-auto mt-4" />
          </div>

          {/* Introduction */}
          <div className="text-gray-200 leading-relaxed">
            <p className="text-lg">
              Your privacy is important to us. This Privacy Policy explains how ETERNIA 2025, organized by AIIMS Guwahati, collects, uses, and protects your personal information.
            </p>
          </div>

          {/* Privacy Policy sections */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">1. Information We Collect</h3>
              <p className="text-gray-200 leading-relaxed">
                We may collect: name, age, institution name, contact number, and email address; event registration details and preferences; payment information (processed securely through third-party gateways); and photos and videos submitted for participation or captured during events.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">2. How We Use Your Information</h3>
              <p className="text-gray-200 leading-relaxed">
                We use your information to process registrations and event entries, send updates and notifications regarding ETERNIA 2025, generate participation certificates and event communication, and improve user experience and fest management.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">3. Data Protection</h3>
              <p className="text-gray-200 leading-relaxed">
                All data is securely stored and accessible only to authorized team members. Payment-related data is processed through secure, PCI-DSS–compliant third-party gateways. We take reasonable administrative, technical, and physical measures to protect your information.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">4. Information Sharing</h3>
              <p className="text-gray-200 leading-relaxed">
                We do not sell, rent, or trade user data. Information may be shared with authorized vendors or event partners only for fest-related operations.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">5. Media Consent</h3>
              <p className="text-gray-200 leading-relaxed">
                By registering or participating in ETERNIA 2025, you consent to the use of your photographs, videos, and recorded content for official documentation and promotional purposes.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">6. External Links</h3>
              <p className="text-gray-200 leading-relaxed">
                Our website may include links to external pages. We are not responsible for the content or privacy practices of external sites.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">7. Consent</h3>
              <p className="text-gray-200 leading-relaxed">
                By using our website and participating in ETERNIA 2025, you consent to the terms of this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
        </div>
        </section>
  )
};
export default PrivacyPolicy;