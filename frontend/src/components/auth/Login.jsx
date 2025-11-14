import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
// import store from '@/redux/store'
import { Loader2 } from 'lucide-react'

const Login = () => {

  const { loading } = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })



  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false));
    }

  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="bg-gray-100 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 border border-gray-100 rounded-xl p-4 sm:p-6 my-6 sm:my-10 shadow-sm"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

          {/* Email */}
          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter email" />
          </div>

          {/* Password */}
          <div className="my-3">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter password" />
          </div>

          {/* Role Selection */}
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="h-4 w-4 appearance-none rounded-full border border-gray-400 checked:border-black checked:bg-black cursor-pointer transition-all duration-200"
                />
                <span className="text-gray-800 font-medium hover:text-black transition-colors">
                  Student
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="h-4 w-4 appearance-none rounded-full border border-gray-400 checked:border-black checked:bg-gray-800 cursor-pointer transition-all duration-200"
                />
                <span className="text-gray-800 font-medium hover:text-black transition-colors">
                  Recruiter
                </span>
              </label>
            </div>
          </div>

          {
            loading ? <Button  className="w-full bg-black text-white py-2 hover:bg-gray-900 transition-all duration-200"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait ... </Button> :
              <Button
                className="w-full bg-black text-white py-2 hover:bg-gray-900 transition-all duration-200"
                type="submit"
              >
                Login
              </Button>
          }
         


          <p className="text-sm mt-3 text-center">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold text-blue-600">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
