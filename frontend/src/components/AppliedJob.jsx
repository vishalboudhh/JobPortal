import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJob = () => {
  const {allAppliedJobs} = useSelector(store=>store.job);
  return (
    <div className="p-2 sm:p-4 overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <Table className="w-full">
          <TableCaption>A list of your applied jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Date</TableHead>
              <TableHead className="text-xs sm:text-sm">Job Role</TableHead>
              <TableHead className="text-xs sm:text-sm">Company</TableHead>
              <TableHead className="text-right text-xs sm:text-sm">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length <= 0 ? (
              <TableRow>
                <TableCell colSpan="4" className="text-center text-sm sm:text-base py-4">
                  You haven't applied to any job yet
                </TableCell>
              </TableRow>
            ) : allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob?._id}>
                <TableCell className="text-xs sm:text-sm">{appliedJob?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-xs sm:text-sm max-w-[150px] sm:max-w-none truncate sm:truncate-none">{appliedJob?.job?.title}</TableCell>
                <TableCell className="text-xs sm:text-sm max-w-[120px] sm:max-w-none truncate sm:truncate-none">{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`text-xs sm:text-sm ${appliedJob?.status === "rejected" ? 'text-white bg-red-500': 
                    appliedJob?.status === "pending" ? 'text-white bg-blue-500' : 'text-white bg-green-500'
                    }`}>{appliedJob.status.toUpperCase()}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AppliedJob
