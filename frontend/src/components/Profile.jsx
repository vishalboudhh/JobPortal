import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Link, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJob from './AppliedJob'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJob'



const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);
  const isResume = user?.profile?.resume;
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-300 rounded-2xl my-5 p-4 sm:p-6 md:p-8 mx-4 sm:mx-auto'>
        <div className='flex flex-col sm:flex-row justify-between gap-4'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <Avatar className={'h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24'}>
              <AvatarImage 
                src={user?.profile?.profilePhoto || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"} 
                alt='profile' 
              />
            </Avatar>
            <div>
              <h1 className='font-medium text-lg sm:text-xl'>{user?.fullname}</h1>
              <p className='text-sm sm:text-base'>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className='self-start sm:self-auto' variant="outline"><Pen /></Button>
        </div>

        <div className='my-5'>
          <div className='flex items-center gap-3 my-2 text-sm sm:text-base'>
            <Mail className='w-4 h-4 sm:w-5 sm:h-5' />
            <span className='break-words'>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 text-sm sm:text-base'>
            <Contact className='w-4 h-4 sm:w-5 sm:h-5' />
            <span>{user?.phoneNumber}</span>
          </div>

        </div>

        <div className='my-5'>
          <h1 className='text-base sm:text-lg font-semibold mb-2'>Skills</h1>
          <div className='flex flex-wrap items-center gap-2'>
            {
              user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className={'bg-black text-white text-xs sm:text-sm'}>{item}</Badge>) : <span className='text-sm text-gray-500'>No skills found</span>
            }
          </div>
        </div>

        {/* resume */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className={'text-md font-bold'}>Resume</Label>
          {
            isResume ? (
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-3'>
                  <a 
                    target='_blank' 
                    href={user?.profile?.resume} 
                    className='text-blue-500 font-bold hover:underline'
                    rel="noopener noreferrer"
                  >
                    {user?.profile?.resumeOriginalName}
                  </a>
                  <span className='text-sm text-gray-500'>(Click to view)</span>
                </div>
                <div className='text-xs text-gray-400'>
                  Google Drive PDF link
                </div>
              </div>
            ) :
              <span>Resume not found</span>
          }

        </div>

      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl mx-4 sm:mx-auto my-5'>
        <h1 className='font-bold text-base sm:text-lg md:text-xl text-center my-4 sm:my-6 px-4'>Applied Jobs</h1>
        {/* Application Table */}
        <AppliedJob />

      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
