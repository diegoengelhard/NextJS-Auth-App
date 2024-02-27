import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Import toasify
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const router = useRouter()

    // set states
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // handle update password
    const handleSendEmail = async () => {
        try {
            setLoading(true);
            await axios.post('/api/auth/sendemail', { email, emailType: 'RESET' });
            toast.success('Recovery email sent!');
            setLoading(false);
            setTimeout(() => {
                router.push('/signin');
            }, 2000);
        } catch (error: any) {
            // Log error
            console.error(error);
            toast.error('Error sending verification email');
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-5xl font-bold">Reset Password</h1>
                <div className="w-full max-w-md mt-4">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {/* Email input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="oldPassword"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'cursor-not-allowed' : ''}`}
                                type="button"
                                onClick={handleSendEmail}
                            >
                                {loading ? 'Loading...' : 'Send Recovery Email'}
                            </button>
                        </div>
                    </form>
                    <Link href="/signin">Return to Sign In</Link>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword