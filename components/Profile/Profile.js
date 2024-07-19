"use client"

import React from 'react'
import "./Profile.css";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import Image from 'next/image';
import { FaEdit } from "react-icons/fa";
import { useState } from 'react';
import { FaSave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

const Profile = ({ data }) => {

    const [avatarUrl, setAvatarUrl] = useState(data.user.avatar);
    const [avatarInfo, setAvatarInfo] = useState("");
    const [avatarError, setAvatarError] = useState("");

    const handleAvatarChange = async () => {
        const avatarChange = await data.handleAvatarChange(data.user, avatarUrl);
        console.log(avatarChange);
    }

    return (
        <main className="profile">
            <div className="profile-avatar-popup-container">
                <div className="profile-avatar-popup">
                    <div className="title">
                        Change Avatar
                    </div>
                    <div className="close-button">
                        <IoClose />
                    </div>
                    <div className="input-field">
                        <input type="text" className={`avatarInput ${avatarUrl !== '' ? `valid` : ''}`} name="avatarInput" defaultValue={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} required />
                        <span>Avatar Url</span>
                        <i></i>
                    </div>
                    {
                            avatarInfo ? (
                                <>
                                    <div className="info-field">
                                        <div className="icon">
                                            <FaCheckCircle />
                                        </div>
                                        <div className="text">
                                            {avatarInfo}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                        {
                            avatarError ? (
                                <>
                                    <div className="error-field">
                                        <div className="icon">
                                            <MdError />
                                        </div>
                                        <div className="text">
                                            {avatarError}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                    <button className="submit-button" onClick={() => handleAvatarChange()}>
                        <div className="icon">
                            <FaSave />
                        </div>
                        <div className="text">
                            Save
                        </div>
                    </button>
                </div>
            </div>
            <div className="profile-section">
                <div className="sidebar">
                    <div className="sidebar-item">
                        <div className="icon">
                            <FaUser />
                        </div>
                        <div className="text">
                            Personal Details
                        </div>
                    </div>
                    <div className="sidebar-item">
                        <div className="icon">
                            <FaGear />
                        </div>
                        <div className="text">
                            Settings
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                <div className="content">
                    <div className="content-heading">
                        Personal Details
                    </div>
                    <div className="user-card">
                        <div className="profile-avatar">
                            {
                                data.user?.avatar ?
                                    // <Image src={user?.avatar} width={30} height={30} quality={100} unoptimized alt="User Avatar" className="avatar-image" />
                                    <Image className="profile-avatar-image" width={100} height={100} src={data.user.avatar} alt="sahayata cover" />
                                    :
                                    <div className="profile-avatar-image-alt">
                                        <FaUserCircle />
                                    </div>
                            }
                            <div className="profile-avatar-edit-button">
                                <FaEdit />
                            </div>
                        </div>
                        <div className="name">
                            {
                                data.user.name
                            }
                        </div>
                        <div className="role">
                            {
                                data.role
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile