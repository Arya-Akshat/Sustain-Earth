
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-nature-500" />
              <span className="text-xl font-bold text-nature-700">SustainEarth</span>
            </div>
            <p className="text-gray-600 mb-4">
              Working together for a sustainable future. Our mission is to protect our planet
              and create a better world for future generations.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-nature-500">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-nature-500">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-nature-500">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-nature-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-nature-600">Home</Link></li>
              <li><Link to="/aqi" className="hover:text-nature-600">AQI Tracker</Link></li>
              <li><Link to="/news" className="hover:text-nature-600">News</Link></li>
              <li><Link to="/get-involved" className="hover:text-nature-600">Get Involved</Link></li>
              <li><Link to="/campaigns" className="hover:text-nature-600">Campaigns</Link></li>
              <li><Link to="/calculator" className="hover:text-nature-600">Carbon Calculator</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-nature-600">Blog</a></li>
              <li><a href="#" className="hover:text-nature-600">Research</a></li>
              <li><a href="#" className="hover:text-nature-600">Reports</a></li>
              <li><a href="#" className="hover:text-nature-600">Educational Materials</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="flex items-start space-x-3 mb-2">
              <Mail size={20} className="text-gray-500 mt-1" />
              <span>contact@sustainearth.org</span>
            </div>
            <address className="not-italic text-gray-600">
              123 Eco Street<br />
              Green City, Earth 12345
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6 text-sm text-center text-gray-500">
          <p>© {new Date().getFullYear()} SustainEarth. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-nature-600">Privacy Policy</a>
            <a href="#" className="hover:text-nature-600">Terms of Service</a>
            <a href="#" className="hover:text-nature-600">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
