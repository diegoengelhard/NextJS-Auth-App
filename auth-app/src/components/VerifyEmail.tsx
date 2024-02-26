import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

// verify token function
import jwtTools from "../utils/jwt.tools";

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const VerifyEmail = () => {
    // Set states
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    // Verify email function
    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/auth/verifyemail', { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
            setVerified(false);
            console.log(error);
        }
    }

    // Use effect to get token from the URL
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        console.log(urlToken);
        setToken(urlToken || "");
    }, []);

    // Verify token is a valid token
    const isValidToken = () => {
        return jwtTools.verifyToken(token);
    }

    // Use effect to verify user email
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
            setError(false);
        }
    }, [token]);

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
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <FontAwesomeIcon icon={faCircleXmark} style={{color: "#f20256",}} size="5x"/>
                                <h1 className="text-5xl text-black my-4">Email Verification</h1>
                                <p className="text-gray-600 my-2">Your email was not verified.</p>
                                <Link href="/signin">
                                    <p className=" hover:text-blue-500 text-black font-bold py-2 rounded my-2">Return to site</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyEmail