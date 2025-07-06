"use client";

import {useState, useEffect} from 'react';
import Link from 'next/link';

export default function SignupPage() {
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const urlToken = location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0)
            verifyEmail();
    }, [token]);

    const verifyEmail = async () => {
        try {
            const response = await fetch("/api/users/verifyemail", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token})
            });
            const res = await response.json();
            console.log("Email Verified: ",res);
            setVerified(true);

        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="space-y-4">
            <h1>Email verification</h1>
            <span className="bg-green-950 text-white p-2 rounded-md">{token ? token : "No token"}</span>
            {verified && (<>
                <p>Email verified successfully!</p>
                <Link href="/login">Login Here</Link>
                </>
            )}
            { error && <p>Error in email verification.</p> }
        </div>
    )
}