import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/backend.axios";

function Footer() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/admininfo/")
      .then((res) => {
        setData(res.data[0]);        // receives object
        console.log("Admin Info:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <footer className="w-full flex flex-col bg-gradient-to-t from-blue-50 to-sky-50 text-purple-700 mt-5 pl-1 pr-1 font-sans border-t-2 [border-image: linear-gradient(to right, #b99ee8, #a2d5b7)]">
      
      <div className="flex justify-evenly flex-wrap max-w-900 mx-auto gap-2">

        {/* ABOUT SECTION */}
        <div className="flex flex-col mb-2 mt-4 ml-15">
          <h2 className="text-2xl font-bold">BioComputaionalLab</h2>

          <p className="my-2 mx-0 leading-6 text-[rgb(38,31,31)] text-base">
            <span>“</span>
            {/* FIX: Prevent crash by rendering string only */}
            {loading
              ? "Loading info..."
              : data?.labInfo || data?.description || "No lab info available"}
            <span>”</span>
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            <Link className="text-gray-800 text-xl hover:text-purple-600" to="#"><FaFacebookF /></Link>
            <Link className="text-gray-800 text-xl hover:text-purple-600" to="#"><FaTwitter /></Link>
            <Link className="text-gray-800 text-xl hover:text-purple-600" to="#"><FaLinkedinIn /></Link>
            <Link className="text-gray-800 text-xl hover:text-purple-600" to="#"><FaYoutube /></Link>
            <Link className="text-gray-800 text-xl hover:text-purple-600" to="#"><FaInstagram /></Link>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="flex-[1_1_200px] mb-4 ml-15">
          <h3 className="text-base mb-2 text-green-600 font-semibold mt-4">Quick Links</h3>
          <ul>
            <li className="mb-2"><a className="text-gray-700 hover:text-purple-600" href="/">Home</a></li>
            <li className="mb-2"><a className="text-gray-700 hover:text-purple-600" href="/research">Research</a></li>
            <li className="mb-2"><a className="text-gray-700 hover:text-purple-600" href="/event">Event</a></li>
            <li className="mb-2"><a className="text-gray-700 hover:text-purple-600" href="/project">Project</a></li>
            <li className="mb-2"><a className="text-gray-700 hover:text-purple-600" href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="flex-[1_1_200px] mb-4">
          <h3 className="text-base mb-2 text-green-600 font-semibold mt-4">Resources</h3>
          <ul>
            <li><a className="text-gray-700 hover:text-purple-600" href="/tools">Bioinformatics Tools</a></li>
            <li><a className="text-gray-700 hover:text-purple-600" href="/datasets">Datasets</a></li>
            <li><a className="text-gray-700 hover:text-purple-600" href="/workshops">Workshops</a></li>
            <li><a className="text-gray-700 hover:text-purple-600" href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="text-center py-2 border-t border-black text-sm text-gray-600 mt-4">
        <p>© {new Date().getFullYear()} BioComputationalLab. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
