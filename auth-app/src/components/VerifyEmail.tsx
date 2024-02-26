import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const VerifyEmail = () => {

    // Set states
    const [data, setData] = useState({
        email: '',
        username: '',
        isAdmin: false,
        isVerified: false
    });
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Verify email function
    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            await axios.post('/api/auth/verifyemail', { token, userId })
            setVerified(true);
            setLoading(false);
        } catch (error: any) {
            setError(true);
            setVerified(false);
            setLoading(false);
            console.log(error);
            toast.error('Email verification failed');
        }
    }

    // Use effect to get token from the URL
    useEffect(() => {
        const url = window.location.href;
        const tokenStart = url.indexOf('token=') + 6;
        const tokenEnd = url.indexOf('&id');
        const token = url.slice(tokenStart, tokenEnd);
        setToken(token || "");
    }, []);

    // Use effect to verify user email
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
            setError(false);
        }
    }, [token]);

    // Use effect to get the user data via the id
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const id = params.get('id');

        if (id !== null) {
            setUserId(id);
        }
    }, []);

    // Fetch user data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await axios.get(`/api/profile/${userId}`);
            setData(res.data.user);
            setLoading(false);
        };

        fetchData();
    }, [userId]);


    if (loading) {
        return <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            Loading...
        </div>;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <div className="w-1/2 max-w mt-4">
                    <div className='flex flex-col items-center justify-center bg-white shadow-md rounded px-8 py-8 mb-4'>
                        {verified && error === false ? (
                            <div className="flex flex-col items-center justify-center">
                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#07cf2f" }} size="5x" />
                                <h1 className="text-5xl text-black my-4">Email Verification</h1>
                                <p className="text-gray-600 my-2">Your email was verified.</p>
                                <Link href="/signin">
                                    <p className=" hover:text-blue-500 text-black font-bold py-2 rounded my-2">Return to site</p>
                                </Link>
                            </div>
                        ) : verified && error === true ? (
                            <div className="flex flex-col items-center justify-center">
                                <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#f20256", }} size="5x" />
                                <h1 className="text-5xl text-black my-4">Email Verification</h1>
                                <p className="text-gray-600 my-2">Your email was not verified.</p>
                                <Link href="/signin">
                                    <p className=" hover:text-blue-500 text-black font-bold py-2 rounded my-2">Return to site</p>
                                </Link>
                            </div>
                        ) : data.isVerified &&(
                            <div className="flex flex-col items-center justify-center">
                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#07cf2f" }} size="5x" />
                                <h1 className="text-5xl text-black my-4">Email Verification</h1>
                                <p className="text-gray-600 my-2">Your email was verified.</p>
                                <Link href="/signin">
                                    <p className=" hover:text-blue-500 text-black font-bold py-2 rounded my-2">Return to site</p>
                                </Link>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyEmail