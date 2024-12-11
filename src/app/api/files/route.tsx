import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const posts = [
            {
                firstName: "Piotr",
                age: 20
            }
        ]
        return NextResponse.json(posts);
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch posts!")
    }
}