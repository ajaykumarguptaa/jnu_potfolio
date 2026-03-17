import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-t from-blue-50 to-sky-50 fixed top-0 left-0 w-full z-50 bg-white shadow">
      <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 shadow-md">
        <div className="flex justify-between h-16 items-center">
          <div
            className="font-sans font-semibold text-xl tracking-[0.6px] text-center my-4 
         bg-gradient-to-r from-[#7317d4] to-[#414956] bg-clip-text text-transparent 
         ease-in-out ...  hover:from-[#d46917] hover:to-[#218b23] transition-all duration-500 hover:shadow-lg max-[320px]:text-base"
          >
            {" "}
            Health And Computational Informatics Lab{" "}
          </div>

          {/* Desktop nav */}
          <nav className=" hidden lg:flex space-x-8 text-xl leading-7 items-center">
            <NavLink
              to="/Home"
              className={({ isActive }) =>
                `no-underline text-xl hover:text-gray-600  hover:scale-120 hover:transition-all duration-200 hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)] ${
                  isActive ? "text-green-800 font-bold" : "text-[#000000]"
                }`
              }
            >
              {" "}
              Home
            </NavLink>

            {/* Members dropdown */}
            <div className="relative h-150px ">
              <button
                onClick={() => setIsMembersOpen((prev) => !prev)}
                className="flex items-center ml-1 bg-none border-none hover:text-[#0891b2] space-x-1 hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
              >
                <span className="text-[#000000] text-xl hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]">
                  Members
                </span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isMembersOpen ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isMembersOpen && (
                <ul
                  className="absolute top-full mt-2 bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 w-40 rounded-2xl text-black"
                  onMouseLeave={() => setIsMembersOpen(!isMembersOpen)}
                >
                  <li onClick={() => setIsMembersOpen(!isMembersOpen)}>
                    <Link
                      to="/Member/CurrentMember"
                      className="block py-2 px-2 text-[#000000] text-[1rem] hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
                    >
                      Current Members
                    </Link>
                  </li>
                  <li onClick={() => setIsMembersOpen(!isMembersOpen)}>
                    <Link
                      to="/Alumni"
                      className="block py-2 px-2 text-[#0e0e0e] text-[1rem] hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
                    >
                      Alumni
                    </Link>
                  </li>
                  <li onClick={() => setIsMembersOpen(!isMembersOpen)}>
                    <Link
                      to="/Interns"
                      className="block py-2 px-2 text-[#050505] text-[1rem] hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
                    >
                      Interns
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            <NavLink
              to="/Research"
              className={({ isActive }) =>
                `no-underline text-xl hover:text-gray-600  hover:scale-120 hover:transition-all duration-200 hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)] ${
                  isActive ? "text-green-800 font-bold" : "text-[#000000]"
                }`
              }
            >
              {" "}
              Research
            </NavLink>
            <NavLink
              to="/Event"
              className={({ isActive }) =>
                `no-underline text-xl hover:text-gray-600  hover:scale-120 hover:transition-all duration-200 hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)] ${
                  isActive ? "text-green-800 font-bold" : "text-[#000000]"
                }`
              }
            >
              {" "}
              Event
            </NavLink>
            <NavLink
              to="/Project"
              className={({ isActive }) =>
                `no-underline text-xl hover:text-gray-600  hover:scale-120 hover:transition-all duration-200 hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)] ${
                  isActive ? "text-green-800 font-bold" : "text-[#000000]"
                }`
              }
            >
              {" "}
              Project
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `no-underline text-xl hover:text-gray-600  hover:scale-120 hover:transition-all duration-200 hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)] ${
                  isActive ? "text-green-800 font-bold" : "text-[#000000]"
                }`
              }
            >
              {" "}
              Contact Us
            </NavLink>

             
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* <button
              onClick={() => navigate("/admin-login")}
              className=" px-2 py-1
             text-blue-600 border-2 border-blue-500
             rounded-md font-medium
             transition duration-200
             hover:bg-blue-300 hover:text-white
             focus:outline-none focus:ring-2 focus:ring-blue-200
           active:bg-blue-400 max-[400px]:hidden"
            >
              Admin
            </button> */}

            <button
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                setIsMembersOpen(false);
              }}
              className="text-gray-800 hover:text-cyan-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 text-lg leading-7 space-y-1 ">
          <Link
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            to="/Home"
            className="block bg-none no-underline text-[#551A8B] text-[1.5rem] hover:text-cyan-600"
          >
            Home
          </Link>

          {/* Mobile Members dropdown */}
          <div>
            <button
              onClick={() => setIsMembersOpen((prev) => !prev)}
              className="flex w-full py-2 bg-none border-none hover:text-cyan-600 hover:bg-none"
            >
              <span className="bg-none no-underline text-[#551A8B] text-[1.5rem] hover:text-cyan-600">
                Members
              </span>
              <svg
                className={`${"w-5 h-5 pt-2 pr-[5px] transition-transform duration-200 ease-in-out rotate-0"} ${
                  isMembersOpen ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isMembersOpen && (
              <ul className="pl-4 space-y-1">
                <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                 <Link
                      to="/Member/CurrentMember"
                      className="block py-2 px-2 text-[#000000] text-[1.5rem] hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
                    >
                      Current Members
                    </Link>
                </li>
                <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                 <Link
                      to="/Alumni"
                      className="block py-2 px-2 text-[#0e0e0e] text-[1.5rem] hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
                    >
                      Alumni
                    </Link>
                </li>
                <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <Link
                      to="/Interns"
                      className="block py-2 px-2 text-[#050505] text-[1.5rem] hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
                    >
                      Interns
                    </Link>
                </li>
              </ul>
            )}
          </div>

          <Link
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            to="/Research"
            className="block py-2 no-underline text-[1.5rem] text-[#551A8B] bg-transparent 
         hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
          >
            Research
          </Link>
          <Link
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            to="/Event"
            className="block py-2 no-underline text-[1.5rem] text-[#551A8B] bg-transparent 
         hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
          >
            Event
          </Link>
          <Link
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            to="/Project"
            className="block py-2 no-underline text-[1.5rem] text-[#551A8B] bg-transparent 
         hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
          >
            Project
          </Link>
          <Link
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            to="/contact"
            className="block py-2 no-underline text-[1.5rem] text-[#551A8B] bg-transparent 
         hover:text-[#0891b2] hover:drop-shadow-[0_6px_6px_rgba(3,245,249,0.8)]"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
