import Job from '@/components/Job';
import Navbar from '@/components/shared/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchQuery } from '@/redux/jobSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    }
  }, [])
  return (
    <div>
      <Navbar />
      
      <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
        <h1 className='font-bold text-xl sm:text-2xl md:text-3xl my-6 sm:my-10'>Search Results  ({allJobs.length}) </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-5'>
          {
            allJobs.map((job) => {
              return (
                <Job key={job._id} job={job} />
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default Browse
