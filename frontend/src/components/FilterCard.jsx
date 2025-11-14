import React, { useEffect, useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const filterData = [
  { filterType: "Location", array: ["Delhi", "Pune", "Bangalore", "Hyderabad", "Jaipur", "Indore", "Mumbai"] },
  { filterType: "Industry", array: ["Frontend", "Backend", "Fullstack", "DevOps", "DataEngineer", "SoftwareDeveloper"] },
  { filterType: "Salary", array: ["0-40k", "50-1lakh", "1lakh to 5lakh"] },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue])

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h1 className="font-bold text-xl md:text-2xl text-gray-800 mb-3">Filter Jobs</h1>
      <hr className="mb-4" />

      <RadioGroup.Root value={selectedValue} className="flex flex-col gap-4" onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-3">
            <h2 className="font-semibold text-lg md:text-xl mb-2 capitalize text-gray-700">{data.filterType}</h2>

            <div className="flex flex-wrap gap-2">
              {data.array.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 py-1 px-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition text-sm md:text-base">
                  <RadioGroup.Item
                    value={item}
                    id={`${data.filterType}-${idx}`}
                    className="w-4 h-4 rounded-full border border-gray-900 flex items-center justify-center"
                  >
                    <RadioGroup.Indicator className="w-2.5 h-2.5 bg-gray-800 rounded-full" />
                  </RadioGroup.Item>
                  <Label htmlFor={`${data.filterType}-${idx}`} className="capitalize">{item}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  )
}

export default FilterCard
