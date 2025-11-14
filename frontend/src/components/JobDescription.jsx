import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';


const JobDescription = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);

    const applyJobHandler = async() => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            console.log(res.data);
            
            if (res.data.success) {
                setIsApplied(true);
                // Add the new application ID to the Redux store
                const updatedSingleJob = {
                    ...singleJob, 
                    applications: [...(singleJob.applications || []), res.data.application._id]
                }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                console.log('Fetched job data:', res.data.job);
                console.log('Applications:', res.data.job.applications);
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch])

    // Update isApplied whenever singleJob changes
    useEffect(() => {
        console.log('Checking application status...');
        console.log('singleJob:', singleJob);
        console.log('user._id:', user?._id);
        
        if (singleJob?.applications && user?._id) {
            const hasApplied = singleJob.applications.some(application => {
                console.log('Checking application:', application);
                // Handle different possible structures:
                // 1. application is just an ID string
                if (typeof application === 'string') {
                    return false; // Can't match user ID with application ID
                }
                // 2. application is an object with applicant field
                const applicantId = typeof application.applicant === 'object' 
                    ? application.applicant._id 
                    : application.applicant;
                console.log('Comparing:', applicantId, 'with', user._id);
                return applicantId === user._id;
            });
            console.log('Has applied:', hasApplied);
            setIsApplied(hasApplied);
        }
    }, [singleJob, user?._id]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-6 sm:my-10 px-4 sm:px-6 lg:px-8'>
            {/* Top section: Title + Apply button */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
                <div className='flex-1'>
                    <h1 className='font-bold text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4'>{singleJob?.title}</h1>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        <Badge className="text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 transition text-xs sm:text-sm" variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className="text-sky-600 font-semibold bg-orange-50 hover:bg-orange-100 transition text-xs sm:text-sm" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-purple-700 font-semibold bg-purple-50 hover:bg-purple-100 transition text-xs sm:text-sm" variant="ghost">
                            {singleJob?.salary}
                        </Badge>
                    </div>
                </div>

                {/* Apply Button */}
                <Button 
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`w-full sm:w-auto rounded-lg px-6 py-2 ${isApplied ? 'text-white bg-gray-900 cursor-not-allowed' :
                        'text-white bg-purple-600 hover:bg-purple-800'}`}>
                    {isApplied ? 'Already Applied' : "Apply Now"}
                </Button>
            </div>

            {/* Job Description */}
            <div className='mt-6 sm:mt-8'>
                <h1 className='text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 pb-2 border-b-2 border-b-gray-300'>Job Description</h1>

                <div className='space-y-3 sm:space-y-4'>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <h3 className='font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px]'>Role:</h3>
                        <span className='font-normal text-gray-800 text-sm sm:text-base'>{singleJob?.title}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <h3 className='font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px]'>Location:</h3>
                        <span className='font-normal text-gray-800 text-sm sm:text-base'>{singleJob?.location}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <h3 className='font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px]'>Description:</h3>
                        <span className='font-normal text-gray-800 text-sm sm:text-base break-words'>{singleJob?.description}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <h3 className='font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px]'>Experience:</h3>
                        <span className='font-normal text-gray-800 text-sm sm:text-base'>{singleJob?.experienceLevel}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <h3 className='font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px]'>Salary:</h3>
                        <span className='font-normal text-gray-800 text-sm sm:text-base'>{singleJob?.salary}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <h3 className='font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px]'>Total Applicants:</h3>
                        <span className='font-normal text-gray-800 text-sm sm:text-base'>{singleJob?.applications?.length || 0}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <h3 className='font-bold text-sm sm:text-base min-w-[80px] sm:min-w-[100px]'>Posted Date:</h3>
                        <span className='font-normal text-gray-800 text-sm sm:text-base'>
                            {singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default JobDescription