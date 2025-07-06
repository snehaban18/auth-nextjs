"use client";

import {useState, ChangeEvent, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [signUpDisabled, setSignupDisabled] = useState(true);

    useEffect(() => {
        // do all validation here
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0)
            setSignupDisabled(false);
        else
            setSignupDisabled(true);
    });

    const onSignup = async () => {
        try {
            const response = await fetch("/api/users/signup", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            });
            // if (!response.ok) {
            //     throw new Error("Error!");
            // }
    
            const data = await response.json();
            if (data.error)
                throw new Error(data.error);

            console.log("Signup successful! ", data);
            router.push("/login");

        } catch (error) {
            console.error("Error in signing up!", error);
        }
        finally {

        }
    };

    const updateUser = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        setUser({...user, [field]: e.target.value});
    };

    return (
        <div className="space-y-4">
            <h1>Signup page</h1>
            <hr />
            <label htmlFor='username'>Username: </label>
            <input id="username" type="text" value={user.username} placeholder='Username' onChange={(e) => updateUser(e, 'username')} />
            <br />
            <label htmlFor='email'>Email: </label>
            <input id="email" type="text" value={user.email} placeholder='Email' onChange={(e) => updateUser(e, 'email')} />
            <br />
            <label htmlFor='password'>Password: </label>
            <input id="password" type="password" value={user.password} placeholder='Password' onChange={(e) => updateUser(e, 'password')} />
            <br />
            <button disabled={signUpDisabled} onClick={onSignup}>{signUpDisabled ? 'No signup' : 'SignUp'}</button>
            <hr />
            <Link href="/login">Login Here</Link>
        </div>
    )
}