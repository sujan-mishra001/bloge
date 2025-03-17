import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { X, AlignRight } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";
import { NavLinks } from "../../types/navlink";

export const navLinks: NavLinks[] = [
  { label: "about", href: "/" },
  { label: "blogs", href: "/blogs" },
  { label: "thoughts", href: "/thoughts" },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-bg text-text dark:bg-bg-dark dark:text-text-dark font-josefin">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Theme Toggle (Always Visible on Desktop, Left-Aligned) */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>

        {/* Right-Aligned Links */}
        <ul className="flex-grow hidden md:flex justify-end space-x-12 text-lg">
          {navLinks.map((link) => (
            <li key={link.href} className="relative group">
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `relative transition duration-300 hover:text-accent 
                  dark:hover:text-accent-dark ${
                    isActive
                      ? 'after:content-[""] after:absolute after:h-0.5 after:w-full after:bg-accent/60 dark:after:bg-accent-dark/60 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300'
                      : "text-text dark:text-text-dark"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu (Visible on Mobile) */}
        <button
          className="md:hidden p-2 rounded-full dark:bg-bg bg-bg-dark dark:text-text text-text-dark transform transition-all focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
          onClick={openMobileMenu}
          aria-label="Open Navigation"
        >
          <AlignRight size={24} />
        </button>
      </div>

      {/* Drawer Menu */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 bg-bg dark:bg-bg-dark text-text dark:text-text-dark w-64 transform transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col justify-start items-center space-y-4 z-50 shadow-lg`}
      >
        {/* Mobile Nav Links */}
        <div className="flex flex-col space-y-6 w-full items-center mt-16">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive ? "text-accent dark:text-accent-dark" : "text-text dark:text-text-dark"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Close Button */}
        <button
          className="absolute top-4 left-4 p-2 rounded-full dark:bg-bg dark:text-text bg-bg-dark text-text-dark shadow-lg transform transition-all focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
          onClick={closeMobileMenu}
          aria-label="Close Menu"
        >
          <X size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
