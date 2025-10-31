import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-solid border-t-[var(--secondary-color)]">
      <div className="container mx-auto px-10 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        <div>
             <p className="text-[var(--text-secondary)] text-sm">
           Organised by all India Institute Of Medical Sciences (AIIMS) Guwahati
          </p>
          <br></br>
              <p className="text-[var(--text-secondary)] text-sm">
           Address - AIIMS Guwahati, Silbharal, Changsari District - Kamrup, Pincode-781101, Assam
          </p>
        </div>
          {/* Organizer text */}
       
         
          {/* Social icons */}
          <div className="flex justify-center gap-4">
            {/* <a
              className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
              href="#"
            >
              <svg
                className="feather feather-twitter"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a> */}

            {/* <a
              className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
              href="#"
            >
              <svg
                className="feather feather-facebook"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a> */}

            <a
              className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
              href="https://www.instagram.com/eternia.aiims?igsh=dmVnZWU5Y2thbzVk"
            >
              <svg
                className="feather feather-instagram"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
              href="#"
            >
              Contact Us - +917429775590 
            </a>
            <a
              className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
              href="/terms"
            >
              TERMS & CONDITIONS
            </a>
            <a
              className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
              href="/privacypolicy"
            >
              Privacy Policy
            </a>
            <a
              className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
              href="/refundpolicy"
            >
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
