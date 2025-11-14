import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);

    const [input,setInput] = useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        resumeLink:user?.profile?.resume,
        resumeName:user?.profile?.resumeOriginalName,
        profilePhoto:user?.profile?.profilePhoto
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) =>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const validateGoogleDriveLink = (url) => {
        const googleDriveRegex = /^https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/;
        return googleDriveRegex.test(url);
    }

    const compressImage = (file, maxWidth = 300, quality = 0.5) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Calculate new dimensions
                let { width, height } = img;
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };
            
            img.src = URL.createObjectURL(file);
        });
    };

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); // You'll need to create this preset
        formData.append('folder', 'job-portal-profile-photos');
        formData.append('transformation', 'w_200,h_200,c_fill,g_face,q_auto,f_auto');
        
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME || 'dlaurwlpr'}/image/upload`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Direct upload error:', error);
            throw error;
        }
    };

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        
        if (!file) return;
        
        // Check file type (only images)
        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file only");
            e.target.value = ''; // Clear the input
            return;
        }
        
        // Check file size (limit to 1MB before compression)
        if (file.size > 1 * 1024 * 1024) {
            toast.error("Image size must be less than 1MB");
            e.target.value = ''; // Clear the input
            return;
        }
        
        try {
            // More aggressive compression
            const compressedFile = await compressImage(file, 300, 0.4);
            
            // Create a new File object with the compressed blob
            const compressedImageFile = new File([compressedFile], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
            });
            
            console.log(`Original size: ${(file.size / 1024).toFixed(2)}KB`);
            console.log(`Compressed size: ${(compressedImageFile.size / 1024).toFixed(2)}KB`);
            
            // Only proceed if compressed size is reasonable
            if (compressedImageFile.size > 100 * 1024) { // 100KB limit
                toast.error("Image is still too large after compression. Please try a smaller image.");
                e.target.value = '';
                return;
            }
            
            setInput({...input, profilePhoto: compressedImageFile});
            toast.success(`Image compressed to ${(compressedImageFile.size / 1024).toFixed(1)}KB`);
        } catch (error) {
            console.error('Image compression error:', error);
            toast.error("Failed to compress image");
            e.target.value = '';
        }
    }

     const submitHandler = async(e) =>{
         e.preventDefault();
         setLoading(true);
         
         // Validate Google Drive link if provided
         if(input.resumeLink && !validateGoogleDriveLink(input.resumeLink)){
             toast.error("Please provide a valid Google Drive PDF link");
             setLoading(false);
             return;
         }
         
         const formData = new FormData();
         formData.append("fullname", input.fullname);
         formData.append("email", input.email);
         formData.append("phoneNumber", input.phoneNumber);
         formData.append("bio", input.bio);
         formData.append("skills", Array.isArray(input.skills) ? input.skills.join(',') : input.skills || '');
         formData.append("resumeLink", input.resumeLink);
         formData.append("resumeName", input.resumeName);
         
         // Add profile photo if provided
         if(input.profilePhoto){
             formData.append("file", input.profilePhoto);
         }

         try {
             const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                 headers: {
                     'Content-Type': 'multipart/form-data'
                 },
                 withCredentials: true
             });
             
             if(res.data.success){
                 dispatch(setUser(res.data.user));
                 toast.success(res.data.message);
                 setOpen(false);
             }
         } catch (error) {
             console.log(`Error`, error);
             toast.error(error.response?.data?.message || 'Something went wrong');
         } finally {
             setLoading(false);
         }
         
         
     }

    
    return (
        <div >
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='bg-white max-w-[95vw] sm:max-w-[425px] max-h-[90vh] overflow-y-auto' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className='text-lg sm:text-xl'>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>

                             <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                 <Label htmlFor="fullname" className={'text-sm sm:text-base sm:text-right'}>Name</Label>
                                 <Input
                                     id="fullname"
                                     name="fullname"
                                     type='text'
                                     value={input.fullname}
                                     onChange={changeEventHandler}
                                     className={'col-span-1 sm:col-span-3'}
                                 />
                             </div>

                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                <Label htmlFor="email" className={'text-sm sm:text-base sm:text-right'}>Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type='email'
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className={'col-span-1 sm:col-span-3'}
                                />
                            </div>

                             <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                 <Label htmlFor="phoneNumber" className={'text-sm sm:text-base sm:text-right'}>Number</Label>
                                 <Input
                                     id="phoneNumber"
                                     name="phoneNumber"
                                     value={input.phoneNumber}
                                     onChange={changeEventHandler}
                                     className={'col-span-1 sm:col-span-3'}
                                 />
                             </div>

                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                <Label htmlFor="bio" className={'text-sm sm:text-base sm:text-right'}>Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className={'col-span-1 sm:col-span-3'}
                                />
                            </div>

                             <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                 <Label htmlFor="skills" className={'text-sm sm:text-base sm:text-right'}>Skills</Label>
                                 <Input
                                     id="skills"
                                     name="skills"
                                     value={Array.isArray(input.skills) ? input.skills.join(', ') : input.skills}
                                     onChange={changeEventHandler}
                                     placeholder="Enter skills separated by commas"
                                     className={'col-span-1 sm:col-span-3'}
                                 />
                             </div>


                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                <Label htmlFor="resumeLink" className={'text-sm sm:text-base sm:text-right'}>Resume Link</Label>
                                <Input
                                    id="resumeLink"
                                    name="resumeLink"
                                    type='url'
                                    placeholder="https://drive.google.com/file/d/.../view"
                                    value={input.resumeLink}
                                    onChange={changeEventHandler}
                                    className={'col-span-1 sm:col-span-3'}
                                />
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                <Label htmlFor="resumeName" className={'text-sm sm:text-base sm:text-right'}>Resume Name</Label>
                                <Input
                                    id="resumeName"
                                    name="resumeName"
                                    type='text'
                                    placeholder="e.g., My_Resume.pdf"
                                    value={input.resumeName}
                                    onChange={changeEventHandler}
                                    className={'col-span-1 sm:col-span-3'}
                                />
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                <Label htmlFor="profilePhoto" className={'text-sm sm:text-base sm:text-right'}>Profile Photo</Label>
                                <Input
                                    id="profilePhoto"
                                    name="profilePhoto"
                                    type='file'
                                    accept="image/*"
                                    onChange={fileChangeHandler}
                                    className={'col-span-1 sm:col-span-3 text-xs sm:text-sm'}
                                />
                            </div>

                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full bg-black text-white py-2 hover:bg-gray-900 transition-all duration-200" > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait ... </Button> :
                                    <Button
                                        className="w-full bg-black text-white py-2 hover:bg-gray-900 transition-all duration-200"
                                        type="submit"
                                    >
                                        Update
                                    </Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog> 
        </div>
    )
}

export default UpdateProfileDialog