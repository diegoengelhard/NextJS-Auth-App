import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignIn = () => {
    const router = useRouter();

    // Set states
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-5xl font-bold">Sign In</h1>
                <div className="w-full max-w-md mt-4">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {/* Email input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="Email"
                            />
                        </div>
                        {/* Password input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="******************"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'cursor-not-allowed' : ''}`}
                                type="button"
                                onClick={() => setLoading(true)}
                            >
                                {loading ? 'Loading...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                    <Link href="/signup">Visit sign up page</Link>
                </div>
            </div>
        </>
    )
}

export default SignIn