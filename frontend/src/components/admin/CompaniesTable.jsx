import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies = [], searchCompanyByText } = useSelector(store => store.company) // default to empty array
    const [filterCompany,setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        })
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            <h1 className='text-center text-purple-500 my-6 sm:my-8 text-2xl sm:text-3xl md:text-4xl font-bold'>Companies Details Page</h1>
            <div className='overflow-x-auto'>
                <Table className={'bg-gray-200 rounded-t-xl min-w-full'}>
                    <TableCaption>A list of your recent registed companies</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-xs sm:text-sm'>Logo</TableHead>
                            <TableHead className='text-xs sm:text-sm'>Name</TableHead>
                            <TableHead className='text-xs sm:text-sm'>Date</TableHead>
                            <TableHead className={'text-right text-xs sm:text-sm'}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            companies.length <= 0 ? (
                                <TableRow>
                                    <TableCell colSpan="4" className="text-center text-sm sm:text-base py-4">
                                        You haven't register any company yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filterCompany?.map((company) => (
                                    <TableRow key={company._id}>
                                        <TableCell>
                                            <Avatar className='w-8 h-8 sm:w-10 sm:h-10'>
                                                <AvatarImage src={company.logo || "https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg?semt=ais_hybrid&w=740&q=80"} />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className='text-xs sm:text-sm max-w-[150px] sm:max-w-none truncate sm:truncate-none'>{company.name}</TableCell>
                                        <TableCell className='text-xs sm:text-sm'>{company.createdAt?.split("T")[0] || "—"}</TableCell>
                                        <TableCell className={'text-right'}>
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal className='w-4 h-4 sm:w-5 sm:h-5' /></PopoverTrigger>
                                                <PopoverContent className={'w-32 bg-white text-black'}>
                                                    <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer text-sm'>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
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

export default CompaniesTable
