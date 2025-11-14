import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    }
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full overflow-x-hidden">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold text-[#55656d]">
            Job<span className="text-[#b919e0]">Portal</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6 text-gray-700">
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li className="hover:text-[#b919e0] cursor-pointer transition"> <Link to="/admin/companies">Companies</Link></li>
                  <li className="hover:text-[#b919e0] cursor-pointer transition"> <Link to={'/admin/jobs'}>Jobs</Link></li>
                </>
              ) : (
                <>
                  <li className="hover:text-[#b919e0] cursor-pointer transition"> <Link to="/">Home</Link></li>
                  <li className="hover:text-[#b919e0] cursor-pointer transition"> <Link to={'/jobs'}>Jobs</Link></li>
                  <li className="hover:text-[#b919e0] cursor-pointer transition"> <Link to={'/browse'}>Browse</Link> </li>
                </>
              )
            }

          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className="font-medium py-1 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-blue-950">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#3d1288] text-white font-medium py-1 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-blue-400">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="pt-5 space-y-2">
                  <div className="flex gap-2 items-center">
                    <User2 />
                    <button className="font-medium py-1 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                      <Link to='/profile'>View Profile</Link>
                    </button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <LogOut />
                    <button onClick={logoutHandler} className="font-medium py-1 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                      Logout
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-[#b919e0] transition"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden w-full overflow-hidden bg-white border-t shadow-sm px-4 sm:px-6">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li className="hover:text-[#b919e0] cursor-pointer transition"> <Link to="/admin/companies">Companies</Link></li>
                  <li className="hover:text-[#b919e0] cursor-pointer transition"> <Link to={'/admin/jobs'}>Jobs</Link></li>
                </>
              ) : (
                <>
                  <li className="hover:text-[#b919e0] cursor-pointer transition"> <Link to="/">Home</Link></li>
                  <li className="hover:text-[#b919e0] cursor-pointer transition"> <Link to={'/jobs'}>Jobs</Link></li>
                  <li className="hover:text-[#b919e0] cursor-pointer transition"> <Link to={'/browse'}>Browse</Link> </li>
                </>
              )
            }
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login">
                <Button className="w-full font-medium py-1 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-blue-950">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-[#6A38C2] hover:bg-[#3d1288] text-white font-medium py-1 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-blue-400">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-2 pt-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Vishal</h4>
                  <p className="text-sm text-gray-500">Software developer</p>
                </div>
              </div>
              <button className="flex items-center gap-2 mt-2 text-gray-700 hover:text-[#b919e0] transition w-full">
                <User2 size={18} />
                <Link to='/profile'>View Profile</Link>
              </button>
              <button onClick={logoutHandler} className="flex items-center gap-2 text-gray-700 hover:text-[#b919e0] transition w-full">
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
