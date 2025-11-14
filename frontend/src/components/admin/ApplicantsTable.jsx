import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async(status,id) =>{
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='px-4 sm:px-6 lg:px-8 overflow-x-auto'>
            <div className='min-w-full inline-block align-middle'>
                <Table className='w-full'>
                    <TableCaption>A list of your recent applied user</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-xs sm:text-sm'>
                                Full Name
                            </TableHead>
                            <TableHead className='text-xs sm:text-sm'>
                                Email
                            </TableHead>
                            <TableHead className='text-xs sm:text-sm'>
                                Contact number
                            </TableHead>
                            <TableHead className='text-xs sm:text-sm'>
                                Resume
                            </TableHead>
                            <TableHead className='text-xs sm:text-sm'>
                                Date
                            </TableHead>
                            <TableHead className={'text-right text-xs sm:text-sm'}>
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            applicants && applicants?.applications?.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell className='text-xs sm:text-sm max-w-[100px] sm:max-w-none truncate sm:truncate-none'>{item?.applicant?.fullname}</TableCell>
                                    <TableCell className='text-xs sm:text-sm max-w-[150px] sm:max-w-none truncate sm:truncate-none'>{item?.applicant?.email}</TableCell>
                                    <TableCell className='text-xs sm:text-sm'>{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell className={`text-xs sm:text-sm text-blue-500 cursor-pointer max-w-[120px] sm:max-w-none truncate sm:truncate-none`}>
                                        {
                                            item.applicant?.profile?.resume ?
                                            <a href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferrer' className='hover:underline'>{item?.applicant?.profile?.resumeOriginalName}</a>
                                            : <span>NA</span>
                                        }
                                    </TableCell>
                                    <TableCell className='text-xs sm:text-sm'>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className={'text-right'}>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className='w-4 h-4 sm:w-5 sm:h-5' />
                                            </PopoverTrigger>
                                            <PopoverContent className={'w-32 bg-white text-black'}>
                                                {
                                                    shortListingStatus.map((status, index) => {
                                                        return (
                                                            <div onClick={()=>statusHandler(status,item?._id)} key={index} className='cursor-pointer text-sm hover:bg-gray-100 p-1 rounded'>
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>

                                    </TableCell>


                                </TableRow>
                            ))
                        }

                    </TableBody>

                </Table>
            </div>
        </div>
    )
}

export default ApplicantsTable
