import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
  const [input,setInput] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-6 sm:my-10 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 my-5'>
          <Input
            className={'w-full sm:w-auto sm:min-w-[200px] md:min-w-[300px]'}
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={()=>navigate("/admin/companies/create")} className={'cursor-pointer bg-violet-500 text-white w-full sm:w-auto whitespace-nowrap'}>New Company</Button>
        </div>

        <CompaniesTable/>

      </div>
    </div>
  )
}

export default Companies
