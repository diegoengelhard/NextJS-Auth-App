import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation';
import axios from "axios";

// Import toast
import { toast } from 'react-toastify';

const UserProfile = () => {
    const params = useParams();

    const router = useRouter()

    // Set states
    const [data, setData] = useState({
        email: '',
        username: '',
        isAdmin: false,
        isVerified: false
    });
    const [loading, setLoading] = useState(false);

    // Fetch user data
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const res = await axios.get(`/api/profile/${params.id}`);
          setData(res.data.user);
          setLoading(false);
        };
    
        fetchData();
      }, [params.id]);
    
      if (loading) {
        return <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            Loading...
        </div>;
      }

      // Handle Sign Out function
    const handleSignOut = async () => {
        try {
            // Send GET request to API route
            const response = await axios.get('/api/auth/signout');
            console.log(response.data);

            // Show success message
            toast.success('Sign out successful!');

            // Redirect to home page
            setTimeout(() => {
                router.push('/signin');
            }, 2000);
        } catch (error: any) {
            // Log error
            console.error(error);
        }
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-5xl font-bold">User Profile</h1>
                {/* Show user data */}
                 <div className="w-full max-w-md mt-4">
                    <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                        <div className="my-4 flex" >
                            <div className="block text-gray-700 text-sm font-bold mb-2" >
                                Email:&nbsp;
                            </div>
                            <div className="block text-gray-700 text-sm mb-2" >
                                {data.email}
                            </div>
                        </div>
                        <hr />
                        <div className="my-4 flex">
                            <div className="block text-gray-700 text-sm font-bold mb-2" >
                                Username:&nbsp;
                            </div>
                            <div className="block text-gray-700 text-sm mb-2" >
                                {data.username}
                            </div>
                        </div>
                        <hr />
                        <div className="my-4 flex">
                            <div className="block text-gray-700 text-sm font-bold mb-2" >
                                Admin Status:&nbsp;
                            </div>
                            <div className="block text-gray-700 text-sm mb-2" >
                                {data.isAdmin ? 'Yes' : 'No'}
                            </div>
                        </div>
                        <hr />
                        <div className="my-4 flex">
                            <div className="block text-gray-700 text-sm font-bold mb-2" >
                                Verified Status:&nbsp;
                            </div>
                            <div className="block text-gray-700 text-sm mb-2" >
                                {data.isVerified ? 'Yes' : 'No'}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleSignOut}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                 </div>

            </div>
        </>
    )
}

export default UserProfile