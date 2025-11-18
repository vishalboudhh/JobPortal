import React, { useEffect, useState } from "react";
import FilterCard from "@/components/FilterCard";
import Job from "@/components/Job";
import Navbar from "@/components/shared/Navbar";
import { X, Filter } from "lucide-react";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const [isOpen, setIsOpen] = useState(false);
  const { allJobs, searchQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    let filtered = [...allJobs];

    // Handle searchQuery which is now an object with location, jobType, salary filters
    if (typeof searchQuery === 'object' && Object.keys(searchQuery).length > 0) {
      const { location, jobtype, salary } = searchQuery;

      if (location) {
        filtered = filtered.filter((job) =>
          job.location?.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (jobtype) {
        filtered = filtered.filter((job) =>
          job.jobType?.toLowerCase() === jobtype.toLowerCase()
        );
      }

      if (salary) {
        filtered = filtered.filter((job) => {
          const jobSalary = job.salary?.toLowerCase() || "";
          return jobSalary.includes(salary.toLowerCase());
        });
      }
    } else if (typeof searchQuery === 'string' && searchQuery) {
      // Fallback for string search
      filtered = filtered.filter((job) => {
        return (
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    setFilterJobs(filtered);
  }, [allJobs, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        {/* 📱 Mobile Filter Button */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h1 className="text-xl font-semibold text-gray-800">All Jobs</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* 🧾 Layout */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* ✅ Filter Section (Desktop) */}
          <div className="hidden lg:block w-full lg:w-1/4 xl:w-1/5 shrink-0">
            <FilterCard />
          </div>

          {/* ✅ Job Cards Section */}
          <div className="flex-1 min-h-[70vh] max-h-[85vh] overflow-y-auto pb-5">
            {filterJobs.length <= 0 ? (
              <div className="flex justify-center items-center h-full text-gray-500 font-medium">
                {allJobs.length <= 0 ? "Jobs not found 😔" : "No jobs match your filters"}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                  filterJobs.map((job) => (
                    <Job key={job?._id} job={job} />
                  ))
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📱 Mobile Drawer for Filters with Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)} // click outside closes
        >
          <div
            className="bg-white w-4/5 sm:w-2/5 h-full shadow-lg p-4 relative overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-700 hover:text-black transition"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Filters
            </h2>
            <FilterCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
