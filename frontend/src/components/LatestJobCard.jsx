import React from 'react'
import { Badge } from './ui/badge'
import { Briefcase, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LatestJobCard = ({job}) => {
  const navigate =useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-2xl shadow-lg bg-white border border-gray-100 cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition duration-300 ease-in-out flex flex-col justify-between h-full">
      
      {/* Company Info */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="font-semibold text-lg md:text-xl text-gray-800 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#6A38C2]" />
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            {job?.location || "India"}
          </p>
        </div>
        <img 
          src={job?.company?.logo} 
          alt="company logo" 
          className="w-12 h-12 object-cover rounded-full hidden sm:block"
        />
      </div>

      {/* Job Info */}
      <div>
        <h1 className="font-bold text-lg md:text-xl text-gray-800 mb-2">
          {
            job?.title
          }
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
            {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-5">
        <Badge className="text-blue-700 font-bold bg-blue-50 hover:bg-blue-100 transition" variant="ghost">
          {job?.position} positions
        </Badge>
        <Badge className="text-sky-600 font-bold bg-orange-50 hover:bg-orange-100 transition" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-bold bg-purple-50 hover:bg-purple-100 transition" variant="ghost">
          {job?.salary}
        </Badge>
      </div>

    </div>
  )
}

export default LatestJobCard
