import { motion } from "framer-motion";
import React from "react";
import CountUp from "react-countup";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { tags } from "../utils";

const Hero = () => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <div className="page1 bg-gradient-to-r from-transparent to-slate-900/30 md:h-screen w-full flex max-lg:flex-col-reverse">
      <div className="heroLeft h-full flex flex-col items-center justify-center w-1/2 max-lg:w-full">
        <div className="flex leftContent items-start justify-center flex-col md:w-3/5 px-4 gap-4">
          <h1>Welcome to Jobster</h1>
          <h1 className="text-5xl max-lg:text-3xl font-bold">
            Find the Perfect Job for You.
          </h1>
          <p className="text-sm max-lg:text-xs">
            Search your career opportunities through{" "}
            <CountUp end={28000} duration={5} suffix="+" /> jobs
          </p>
          <div
            className={`rounded-2xl flex border border-slate-500 max-lg:flex-col gap-1 p-2 px-4 max-lg:w-full ${
              theme === "dark" && "bg-slate-900/90"
            }`}
          >
            <input
              type="text"
              placeholder="Search for jobs"
              className="bg-transparent outline-none w-full text-sm py-2"
            />
            <div className="flex items-center justify-between gap-4">
              <select
                name="location"
                id=""
                className="bg-gray-400/30 border border-slate-500 rounded-md p-1 text-sm font-light outline-none"
              >
                <option
                  className={` ${
                    theme === "dark" ? "bg-slate-800/80" : "bg-slate-400/40"
                  } text-sm py-1 px-1 font-extralight hover:font-medium cursor-pointer hover:bg-slate-900/50`}
                >
                  Location
                </option>
                <option
                  className={` ${
                    theme === "dark" ? "bg-slate-800/80" : "bg-slate-400/40"
                  } text-sm py-1 px-1 font-extralight hover:font-medium cursor-pointer hover:bg-slate-900/50`}
                >
                  Location
                </option>
                <option
                  className={` ${
                    theme === "dark" ? "bg-slate-800/80" : "bg-slate-400/40"
                  } text-sm py-1 px-1 font-extralight hover:font-medium cursor-pointer hover:bg-slate-900/50`}
                >
                  Location
                </option>
                <option
                  className={` ${
                    theme === "dark" ? "bg-slate-800/80" : "bg-slate-400/40"
                  } text-sm py-1 px-1 font-extralight hover:font-medium cursor-pointer hover:bg-slate-900/50`}
                >
                  Location
                </option>
              </select>
              <button className="p-2 rounded-full bg-gray-500/60">
                <FaSearch />
              </button>
            </div>
          </div>
          <p className="">Popular Searches</p>
          <div className="flex flex-wrap gap-2 space-y-1 text-xs">
          {tags.map((tag, index) => {
            return (
              <span key={index} className="flex items-center rounded-xl px-2 py-[1px] border bg-slate-900/90 hover:bg-gray-800 cursor-pointer">
                {tag}
              </span>
            );
          })}
          </div>
        </div>
      </div>

      <div className="heroRight mt-[8vh] w-1/2 max-lg:w-full h-1/2 md:h-full flex items-center justify-center">
        <div className="cards h-full w-full relative flex items-center justify-center md:mb-24 max-lg:-mb-12 max-lg:mt-20 -ml-6">
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: "10deg" }}
            transition={{ ease: "linear", duration: 1 }}
            className="hero-card from-blue-300/30"
          >
            <img
              src={"page1-images/01.png"}
              alt="image"
              className="object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: "5deg" }}
            transition={{ ease: "linear", duration: 1, delay: 1 }}
            className="hero-card from-violet-300/30"
          >
            <img
              src={"page1-images/02.png"}
              alt="image"
              className="object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: "linear", duration: 1, delay: 2 }}
            className="hero-card from-slate-900/90"
          >
            <img
              src={"page1-images/03.png"}
              alt="image"
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;