import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { FaCheckCircle, FaBell, FaGraduationCap } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate(`/browse`)
  }
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">

      {/* Background abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="relative flex flex-col gap-6 max-w-5xl w-full pb-10 z-10">

        {/* Top Badge */}
        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mx-auto px-5 py-2 rounded-full bg-gradient-to-r from-[#F83002]/10 to-[#6A38C2]/10 text-[#F83002] border border-[#F83002]/20">
          Best Websites for Finding Jobs as a Fresher
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight text-gray-800">
          Search, Apply & <br className="hidden sm:block" />
          Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F83002] to-[#6A38C2]">
            Dream Job
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed text-center px-2">
          Explore top job portals that connect freshers with leading companies. Build your profile, apply for jobs, and begin your career journey with the best opportunities available online.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto mt-6 bg-white shadow-lg border border-gray-200 p-2 sm:p-3 rounded-2xl items-center gap-3">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your dream job..."
            className="outline-none border-none w-full text-gray-700 text-base px-3 py-2 rounded-xl text-center sm:text-left"
          />
          <Button onClick={()=>searchJobHandler()} className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#F83002] to-[#6A38C2] hover:opacity-90 transition duration-300 flex items-center justify-center gap-2 text-white px-5 py-2">
            <Search className="h-5 w-5" />
            <span className="hidden sm:inline font-semibold">Search</span>
          </Button>
        </div>

        {/* Feature Highlights with Icons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center px-2">
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition flex flex-col items-center gap-3">
            <FaCheckCircle className="text-purple-500 text-3xl" />
            <h4 className="font-semibold text-lg text-gray-800">Verified Companies</h4>
            <p className="text-gray-500 text-sm">Only trusted companies with verified job postings.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition flex flex-col items-center gap-3">
            <FaBell className="text-orange-500 text-3xl" />
            <h4 className="font-semibold text-lg text-gray-800">Instant Notifications</h4>
            <p className="text-gray-500 text-sm">Get notified as soon as new jobs are posted.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition flex flex-col items-center gap-3">
            <FaGraduationCap className="text-blue-500 text-3xl" />
            <h4 className="font-semibold text-lg text-gray-800">Career Guidance</h4>
            <p className="text-gray-500 text-sm">Tips and resources to help you land your dream job.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
