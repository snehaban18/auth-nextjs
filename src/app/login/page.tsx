"use client";

import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from  'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [loginDisabled, setLoginDisabled] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // do all validation here
        if (user.username.length > 0 && user.password.length > 0)
            setLoginDisabled(false);
        else
            setLoginDisabled(true);
    });

    const onLogin = async () => {
        try {
            const response = await fetch("/api/users/login", {
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

            console.log("Login succesful! ", data);
            router.push("/profile");

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
        <div>
            <h1>Login page</h1>
            <hr />
            <label htmlFor='username'>Username: </label>
            <input id="username" type="text" value={user.username} placeholder='Username' onChange={(e) => updateUser(e, 'username')} />
            <br />
            <label htmlFor='password'>Password: </label>
            <input id="password" type="password" value={user.password} placeholder='Password' onChange={(e) => updateUser(e, 'password')} />
            <br />
            <button disabled={loginDisabled} onClick={onLogin}>{loginDisabled ? 'No login' : 'Login'}</button>
            <hr />
            <Link href="/signup">Signup Here</Link>
        </div>
    )
}