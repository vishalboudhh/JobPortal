import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { setAllAppliedJobs } from '@/redux/applicationSlice'

const useGetAllAppliedJobs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/get`,
                    { withCredentials: true }
                )
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log('Error fetching applied jobs:', error)
            }
        }

        fetchAppliedJobs()
    }, [dispatch])
}

export default useGetAllAppliedJobs

useGetAllAppliedJobs() // add this line at top of component