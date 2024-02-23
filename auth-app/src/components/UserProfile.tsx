import React, {useState} from 'react'
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link";
import axios from "axios";

// Import toast
import { toast } from 'react-toastify';

const UserProfile = () => {
    const params = useParams();
    console.log(params.id);

    const router = useRouter()
    const [data, setData] = useState("")

    const getUserDetails = async () => {
        const res = await axios.get(`/api/profile/${params.id}`)
        console.log('user data', res.data);
        // setData(res.data.data._id)
    }


    return (
       <>
            <div>UserProfile {params.id}</div>
            <button onClick={getUserDetails}>get user</button>
       </>
    )
}

export default UserProfile