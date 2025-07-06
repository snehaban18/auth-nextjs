"use client";
import { useParams } from "next/navigation";

export default function UserProfile() {
    const {id} = useParams();

    return (
        <div>
            <h1>Profile page</h1>
            <p>User: <span className="p-2 rounded-lg bg-gradient-to-br from-red-600 to-purple-500 text-indigo-100 border-4 border-current">{id}</span></p>
        </div>
    );
}