import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {

  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) =>{
      const createdAt =  new Date(mongodbTime);
      const currentTime = new Date();
      const timeDifference = currentTime - createdAt;


      return Math.floor(timeDifference/(1000*24*60*60));
  }


  return (
    <div className="p-4 rounded-md shadow-md hover:shadow-lg transition bg-white border border-gray-200 flex flex-col justify-between h-full">
      
      {/* Top bar: time + save icon */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today" :`${daysAgoFunction(job?.createdAt)}`} Days ago</p>
        <Button
          variant="outline"
          className="rounded-full p-1 sm:p-2"
          size="icon"
        >
          <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>

      {/* Company Section */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 my-3">
        <Avatar className="w-12 h-12 sm:w-14 sm:h-14">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div className="flex flex-col">
          <h1 className="font-semibold text-base sm:text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div className="mt-1">
        <h1 className="font-bold text-lg sm:text-xl my-2">{job?.title}</h1>
        <p className="text-sm sm:text-base text-gray-700 leading-snug line-clamp-2 sm:line-clamp-3">
        {job?.description}
        </p>
      </div>

      {/* Tags / Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 transition text-xs sm:text-sm" variant="ghost">
          {job?.position} positions
        </Badge>
        <Badge className="text-sky-600 font-semibold bg-orange-50 hover:bg-orange-100 transition text-xs sm:text-sm" variant="ghost">
          {job?.jobType} jobType
        </Badge>
        <Badge className="text-purple-700 font-semibold bg-purple-50 hover:bg-purple-100 transition text-xs sm:text-sm" variant="ghost">
          {job?.salary} salary
        </Badge>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline" className="w-full sm:w-auto">
          Details
        </Button>
        <Button className="bg-purple-500 text-white w-full sm:w-auto hover:bg-purple-600 transition">
          Save for later
        </Button>
      </div>
    </div>
  )
}

export default Job
