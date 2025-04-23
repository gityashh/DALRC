import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nation%20icon-6fZLXKLDKOGtyQyKrq93Seqr2AjYq3.png"
                alt="National Emblem"
                className="h-16 mr-3"
              />
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                DALRC
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Decentralized Autonomous Legal Record Custodian - Revolutionizing legal record management through blockchain technology.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-700 transition duration-300 text-xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-800 transition duration-300 text-xl">
                <FaGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 transition duration-300 text-xl">
                <SiDiscord />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full z-0"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/features" 
                  className="text-gray-300 hover:text-white transition duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-white transition duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-white transition duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">Legal</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 rounded-full z-0"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="https://www.freeprivacypolicy.com/live/573097b9-4aeb-4132-bd68-db858f8f36a7" 
                  className="text-gray-300 hover:text-white transition duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="https://www.freeprivacypolicy.com/live/afa5a37a-004b-4de5-8bda-91576b00e4d5" 
                  className="text-gray-300 hover:text-white transition duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies" 
                  className="text-gray-300 hover:text-white transition duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/disclaimer" 
                  className="text-gray-300 hover:text-white transition duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 rounded-full z-0"></span>
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span>Based in Vidisha - Serving clients worldwide</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-teal-400 mr-3" />
                <span>+91 7987122057</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                <span>contact@dalrc.io<br />support@dalrc.io</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-medium mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                <button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-4 py-2 rounded-r-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} DALRC. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/sitemap" className="text-gray-400 hover:text-white transition duration-300">
              Sitemap
            </Link>
            <Link to="/faq" className="text-gray-400 hover:text-white transition duration-300">
              FAQ
            </Link>
            <Link to="/careers" className="text-gray-400 hover:text-white transition duration-300">
              Careers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;