import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
// import store from '@/redux/store'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const {loading} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    // const changeFileHandler = (e) => {
    //     setInput({ ...input, file: e.target.files?.[0] })
    // }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {

            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            const message = error.response?.data?.message || "Something went wrong!";
            toast.error(message)
        } finally{
            dispatch(setLoading(false));
        }

    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <form onSubmit={submitHandler} className='bg-gray-100 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 border border-gray-100 rounded-xl p-4 sm:p-6 my-6 sm:my-10'>
                    <h1 className='font-bold text-xl mb-5 text-center'>SignUp</h1>
                    <div className='my-'>
                        <Label>Full Name</Label>
                        <Input
                            type={'text'}
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter name"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type={'text'}
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type={'text'}
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter number"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type={'passord'}
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter password"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup
                            className="flex items-center gap-6 my-5"
                            defaultValue="student"
                        >
                            <div className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label
                                    htmlFor="r1"
                                    className="text-gray-800 font-medium cursor-pointer hover:text-gray-600 transition-colors"
                                >
                                    Student
                                </Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />
                                <Label
                                    htmlFor="r2"
                                    className="text-gray-800 font-medium cursor-pointer hover:text-blue-600 transition-colors"
                                >
                                    Recruiter
                                </Label>
                            </div>
                        </RadioGroup>

                        {/* <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className={'cursor-pointer '}
                            />

                        </div> */}

                    </div>
                    {
                        loading ? <Button className="w-full bg-black text-white py-2 hover:bg-gray-900 transition-all duration-200"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait ... </Button> :
                            <Button
                                className="w-full bg-black text-white py-2 hover:bg-gray-900 transition-all duration-200"
                                type="submit"
                            >
                                SignUp
                            </Button>
                    }
                    <span>Already have an account <Link to='/login' className='font-semibold text-blue-600'>Login</Link> </span>
                </form>
            </div>
        </div>
    )
}

export default Signup
