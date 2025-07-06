"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        const response = await fetch("/api/users/me");
        const respJson = await response.json();
        setUser(respJson.user);
        console.log(respJson.user);
    };

    const onLogout = async () => {
        await fetch("/api/users/logout");
        router.push("/login");
    };

    return (
        <div>
            <h1>Profile page</h1>
            <p>Welcome {user.username}</p>
            <p>Email: {user.email}</p>
            <Link href={`/profile/${user._id}`}>Go to profile details</Link>
            <hr/>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}