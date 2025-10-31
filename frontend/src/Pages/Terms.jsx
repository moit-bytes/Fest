import React from "react";
const Terms = () => {
  return (
    <section className="relative py-20 text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
              TERMS & CONDITIONS
            </h2>
            <p className="text-gray-400 text-sm">Last Updated: October 2025</p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mx-auto mt-4" />
          </div>

          {/* Introduction */}
          <div className="text-gray-200 leading-relaxed">
            <p className="text-lg">
              Welcome to ETERNIA 2025, the annual cultural, literary, and sports fest of All India Institute of Medical Sciences (AIIMS), Guwahati. By accessing or registering through https://aiimsguwahatiEternia2025.com, you agree to abide by the following Terms and Conditions.
            </p>
          </div>

          {/* Terms sections */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">1. General</h3>
              <p className="text-gray-200 leading-relaxed">
                "ETERNIA," "we," "our," or "us" refers to the organizing committee of ETERNIA 2025, AIIMS Guwahati. "You" refers to the user, participant, or visitor accessing the website. These Terms govern all online and offline activities related to ETERNIA 2025.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">2. Registration</h3>
              <p className="text-gray-200 leading-relaxed">
                Participants must register only through the official ETERNIA 2025 website or authorized registration links. Information submitted must be accurate and verifiable. The organizing committee reserves the right to reject or cancel registrations containing false or misleading information.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">3. Participation</h3>
              <p className="text-gray-200 leading-relaxed">
                Participants must follow all event-specific rules and guidelines. Any misconduct, plagiarism, or violation of event ethics will lead to disqualification without refund. The decision of the organizing committee shall be final and binding in all disputes.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">4. Payments</h3>
              <p className="text-gray-200 leading-relaxed">
                Certain events may require an entry or participation fee, payable only via the secure payment options available on the official website. All payments must be completed before the registration deadline to confirm participation.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">5. Intellectual Property</h3>
              <p className="text-gray-200 leading-relaxed">
                All materials on this website—including the logo, design, text, images, and videos—belong to ETERNIA and AIIMS Guwahati. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">6. Liability</h3>
              <p className="text-gray-200 leading-relaxed">
                The organizing committee will not be responsible for personal injury, loss, theft, or damage to personal property during participation in ETERNIA events. Participants attend and compete at their own risk.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-purple-300">7. Amendments</h3>
              <p className="text-gray-200 leading-relaxed">
                The organizing committee reserves the right to modify or update these Terms & Conditions at any time. Continued use of the website or participation after such updates constitutes acceptance of the revised Terms.
              </p>
            </div>
          </div>
        </div>
        </div>
        </section>
  )
};


export default Terms;