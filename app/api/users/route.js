import { NextResponse } from "next/server";

export async function POST(req, res) {
    let {name, age, email} = await req.json();

    if (!name || !age || !email) {
        return NextResponse.json({ error: "required field not found", ok: false }, {status: 400});
    }

    return NextResponse.json({ res: "Credentials verified, user successsfully logged in.", ok: true }, {status: 201});
}