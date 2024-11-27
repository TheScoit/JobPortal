import React,{useState} from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
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
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div className='m-7'>
                    <Link to='/'>
                    <h1 className='text-2xl font-bold '>Job
                    <span className='text-[#90E0EF] mx-0.5 '>Portal</span>
                    </h1>
                    </Link>
                </div>
                <div className='md:flex md:items-center md:gap-12 '>
                    <ul className='md:flex font-medium items-center gap-5 hidden '>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='text-black hover:text-[#3094a6]'>Home</Link></li>
                                    <li><Link to="/jobs" className='text-black hover:text-[#3094a6]'>Jobs</Link></li>
                                    <li><Link to="/browse" className='text-black hover:text-[#3094a6]'>Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='md:flex items-center gap-2 hidden'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#62b2c0] hover:bg-[#3094a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                    <div  className="w-10 flex-col items-start p-[2px 3px] gap-16 list-none  sm:contents lg:hidden md:hidden" onClick={() => setIsOpen(!isOpen) }>
                        <MenuIcon  style={{color: 'inherit'}} />
                    </div>

                    {
                        isOpen && (
                           <div className="w-full h-60 flex absolute top-14 right-0 p-7 py-4 gap-5 flex-col items-start  list-none  sm:contents lg:hidden md:hidden bg-gray-50 z-50" isOpen={isOpen}>
                            <Link onClick={()=> setIsOpen(!isOpen)} to="/" className='text-black hover:text-[#3094a6]'>Home</Link>
                            <Link onClick={()=> setIsOpen(!isOpen)} to="/jobs" className='text-black hover:text-[#3094a6]'>Jobs</Link>
                            <Link onClick={()=> setIsOpen(!isOpen)} to="/browse" className='text-black hover:text-[#3094a6]'>Browse</Link>
                            <div className="gap-12 h-11 flex content-center items-center w-full relative top-3">
                            <Link to="/login"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#62b2c0] hover:bg-[#3094a6]">Signup</Button></Link>
                            </div>
                           </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar