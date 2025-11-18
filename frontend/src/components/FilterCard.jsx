import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'

const filterData = [
  { filterType: "Location", array: ["Delhi", "Pune", "Bangalore", "Hyderabad", "Jaipur", "Indore", "Mumbai"] },
  { filterType: "Job Type", array: ["Full-time", "Part-time", "Contract", "Temporary"] },
  { filterType: "Salary", array: ["0-40k", "50-1lakh", "1lakh to 5lakh"] },
]

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    jobType: "",
    salary: ""
  });
  const dispatch = useDispatch();

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType.toLowerCase()]: prev[filterType.toLowerCase()] === value ? "" : value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      location: "",
      jobType: "",
      salary: ""
    });
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedFilters));
  }, [selectedFilters, dispatch])

  const hasActiveFilters = Object.values(selectedFilters).some(val => val !== "");

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-xl md:text-2xl text-gray-800">Filter Jobs</h1>
        {hasActiveFilters && (
          <Button 
            onClick={clearFilters}
            className="text-xs bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            size="sm"
          >
            Clear All
          </Button>
        )}
      </div>
      <hr className="mb-4" />

      <div className="flex flex-col gap-6">
        {filterData.map((data, index) => {
          const filterKey = data.filterType.toLowerCase().replace(" ", "");
          
          return (
            <div key={index} className="mb-2">
              <h2 className="font-semibold text-lg mb-3 capitalize text-gray-700">{data.filterType}</h2>

              <div className="flex flex-col gap-2">
                {data.array.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`${data.filterType}-${idx}`}
                      checked={selectedFilters[filterKey] === item}
                      onChange={() => handleFilterChange(data.filterType, item)}
                      className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                    />
                    <Label 
                      htmlFor={`${data.filterType}-${idx}`} 
                      className="capitalize cursor-pointer text-sm"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FilterCard
