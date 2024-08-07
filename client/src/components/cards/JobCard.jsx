import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const JobCard = ({ job }) => {
  const theme = useSelector((state) => state.theme.value);
  const [ ref, inView ] = useInView();

  return (
    <motion.div ref={ref} className="flex items-center justify-center">
      <div
        style={{
          transform: inView ? "none" : "translateY(30px)",
          scale: inView ? 1 : 0.5,
          opacity: inView ? 1 : 0,
          transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
        className="flex flex-col items-start shadow-[0_0_25px_gray] shadow-gray-500/40 backdrop-blur-md rounded-md p-4 h-fit"
      >
        <p className="text-xl font-semibold ">{job.title}</p>
        <Link
          to={`/companies/${job.company}`}
          className="company relative flex items-center cursor-pointer py-1 my-1 pr-4 w-fit"
        >
          <img
            src={job.logo}
            alt={job.company}
            className={`w-20 h-10 rounded-full object-contain flex items-center mr-4 ${
              theme === "dark" && "hover-effect-dark"
            }`}
          />
          <p className={`font-semibold `}>{job.company}</p>
        </Link>
        <p className="">{job.location}</p>
        <p>Salary - {job.salary}</p>
        <p>
          {job.description.slice(0, 100)}
          <Link
            to={`/jobs/${job._id}`}
            className={`hover:text-blue-900/70 hover-effect text-xs ${
              theme === "dark" && "hover-effect-dark"
            }`}
          >
            {" "}
            ...see more
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default JobCard;
