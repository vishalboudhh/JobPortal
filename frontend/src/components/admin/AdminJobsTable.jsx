import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { searchCompanyByText } = useSelector(store => store.company)
    const { allAdminJobs = [] } = useSelector(store => store.job) // default to empty array
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredJobs = allAdminJobs.length > 0 && allAdminJobs.filter((job) => {
            if (!searchCompanyByText) {
                return true
            }
            // Fixed: reference job, not company
            return job?.title?.toLowerCase().includes(searchCompanyByText.toLowerCase())||job?.company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterJobs(filteredJobs || [])
    }, [allAdminJobs, searchCompanyByText])

    return (
        <div className='px-4 sm:px-6 lg:px-8'>
             <h1 className='text-center text-purple-500 my-6 sm:my-8 text-2xl sm:text-3xl md:text-4xl font-bold'>Jobs Details Page</h1>
            <div className='overflow-x-auto'>
                <Table className={'bg-gray-200 rounded-t-xl min-w-full'}>
                    <TableCaption>A list of your recent posted jobs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-xs sm:text-sm'>Company Name</TableHead>
                            <TableHead className='text-xs sm:text-sm'>Role</TableHead>
                            <TableHead className='text-xs sm:text-sm'>Date</TableHead>
                            <TableHead className={'text-right text-xs sm:text-sm'}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            allAdminJobs.length <= 0 ? (
                                <TableRow>
                                    <TableCell colSpan="4" className="text-center text-sm sm:text-base py-4">
                                        You haven't posted any job yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filterJobs?.map((job) => (
                                    <TableRow key={job._id}>
                                        <TableCell className='text-xs sm:text-sm max-w-[120px] sm:max-w-none truncate sm:truncate-none'>{job?.company?.name}</TableCell>
                                        <TableCell className='text-xs sm:text-sm max-w-[150px] sm:max-w-none truncate sm:truncate-none'>{job?.title}</TableCell>
                                        <TableCell className='text-xs sm:text-sm'>{job.createdAt?.split("T")[0] || "—"}</TableCell>
                                        <TableCell className={'text-right'}>
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal className='w-4 h-4 sm:w-5 sm:h-5' /></PopoverTrigger>
                                                <PopoverContent className={'w-32 bg-white text-black'}>
                                                    <div onClick={() => navigate(`/admin/jobs/${job?._id}`)} className='flex items-center gap-2 w-fit cursor-pointer text-sm'>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
                                                    </div>
                                                    <div onClick={()=>navigate(`/admin/jobs/${job?._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 text-sm'>
                                                        <Eye className='w-4'/>
                                                        <span>Applicants</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminJobsTable
