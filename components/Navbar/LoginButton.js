"use server"

import React from 'react'
import { auth, signOut } from "@/auth"

const LoginButton = async () => {
    const session = await auth()

    return (
        <>
            {session ? (
                <div className="nav-right-item user-info">
                    <span className="username">{session.user.name}</span>
                    <button className="signout" onClick={() => signOut()}>Sign Out</button>
                </div>
            ) : (
                <Link href='/login' className="nav-right-item signin">Log In</Link>
            )}
        </>
    )
}

export default LoginButton