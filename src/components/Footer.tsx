import { RiGithubLine, RiLinkedinFill, RiMapPinUserFill } from "react-icons/ri";
import { IoMailOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";

const contacts = [
  {
    label: "GitHub",
    icon: RiGithubLine,
    link: "https://github.com/AyushVerma87654",
  },
  {
    label: "LinkedIn",
    icon: RiLinkedinFill,
    link: "https://linkedin.com/in/ayush-verma-developer",
  },
  {
    label: "Email",
    icon: IoMailOutline,
    link: "mailto:ayushverma030299@gmail.com",
  },
  {
    label: "Phone",
    icon: FaPhoneAlt,
    link: "tel:+917017560413",
  },
  {
    label: "Location",
    icon: RiMapPinUserFill,
    link: "https://www.google.com/maps/place/Dehradun,+India",
  },
];

export default function Contact() {
  return (
    <footer className="bg-linear-to-r from-teal-700 via-blue-800 to-indigo-900 backdrop-blur-md shadow-md top-0 z-50 whitespace-nowrap">
      <div className="p-5">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <h2 className="text-2xl font-bold text-orange-500 tracking-tight">
            Get in Touch
          </h2>

          <nav className="flex items-center gap-4">
            {contacts.map(({ label, icon: Icon, link }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  group relative text-gray-200
                  transition-transform duration-200
                  hover:-translate-y-0.5 hover:scale-105
                "
              >
                <Icon className="text-lg group-hover:text-orange-500 transition-colors" />

                <span
                  className="
                    absolute left-1/2 -bottom-1 h-0.5 w-0
                    bg-orange-500
                    group-hover:w-full group-hover:left-0
                    transition-all duration-200
                  "
                />
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="mt-3 mb-2 h-px bg-white/10" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row sm:px-16 items-center justify-center gap-2 sm:gap-8">
          <p className="font-bold text-orange-500 flex items-center gap-2">
            <span>Designed & Built with</span>
            <BsSuitHeartFill size={20} />
          </p>

          {/* Mobile */}
          <p className="block sm:hidden text-sm font-bold text-center">
            © {new Date().getFullYear()} Ayush
          </p>

          {/* Desktop */}
          <p className="hidden sm:block text-sm font-bold text-center">
            © {new Date().getFullYear()} Ayush Verma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
