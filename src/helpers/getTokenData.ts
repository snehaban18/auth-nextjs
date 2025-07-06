import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { UserLogin } from "./authDataTypes";

export async function getTokenData (request: NextRequest) {
    try {
        const encodedToken = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(encodedToken, process.env.JWT_TOKEN_SECRET!);
        return (decodedToken as UserLogin).id;
    }
    catch (error: any) {
        throw new Error("Error parsing token: " + error.message);
    }
}