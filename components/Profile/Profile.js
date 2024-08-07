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
import { ScaleLoader } from 'react-spinners';
import Input from '../Input/Input';
import { FaRegUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

const Profile = ({ data }) => {

    const [avatarUrl, setAvatarUrl] = useState(data.user.avatar);
    const [avatarInfo, setAvatarInfo] = useState("");
    const [avatarError, setAvatarError] = useState("");
    const [avatarModalOpen, setAvatarModalOpen] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('personalDetails');

    const router = useRouter();

    const { data: session, update } = useSession();

    const handleAvatarChange = async () => {

        if (avatarLoading) {
            return;
        }

        setAvatarLoading(true);

        const avatarChange = await data.handleAvatarChange(data.user, avatarUrl);

        // console.log(avatarChange);

        if (avatarChange.success) {
            setAvatarInfo("Avatar updated successfully");

            setTimeout(() => {
                setAvatarModalOpen(false);
                router.refresh();
            }, 1000);

            setAvatarLoading(false);
            return;
        }

        if (avatarChange.error) {
            setAvatarError("Something went wrong, please try again after a while");

            // setTimeout(() => {
            //     setAvatarModalOpen(false);
            // }, 1000);

            setAvatarLoading(false);
            return;
        }

        if (avatarChange.avatarError) {
            setAvatarError(avatarChange.avatarError);

            // setTimeout(() => {
            //     setAvatarModalOpen(false);
            // }, 1000);

            setAvatarLoading(false);
            return;
        }

        setAvatarLoading(false);

    }

    const handleAvatarEditClick = async (e, value) => {
        setAvatarModalOpen(value);
        setAvatarInfo('');
        setAvatarError('');
        // console.log(value);
    }

    const handleContainerClick = (e) => {
        if (e.target.classList.contains('profile-avatar-popup-container')) {
            setAvatarModalOpen(false);
        }
    };

    return (
        <main className="profile">
            {
                avatarModalOpen ?
                    <div className="profile-avatar-popup-container" onClick={handleContainerClick}>
                        <div className="profile-avatar-popup">
                            <div className="title">
                                Change Avatar
                            </div>
                            <button className="close-button" onClick={(e) => handleAvatarEditClick(e, false)}>
                                <IoClose />
                            </button>
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
                            <button className={`submit-button ${avatarLoading ? `loading` : ``}`} onClick={() => handleAvatarChange()}>
                                {
                                    avatarLoading ?
                                        <ScaleLoader height={20} color={"#fff"} />
                                        :
                                        <>
                                            <div className="icon">
                                                <FaSave />
                                            </div>
                                            <div className="text">
                                                Save
                                            </div>
                                        </>
                                }
                            </button>
                        </div>
                    </div>
                    :
                    <></>
            }
            <div className="profile-section">
                <div className="sidebar">
                    <div className={`sidebar-item ${activeSection === 'personalDetails' ? 'active' : ''}`} onClick={() => setActiveSection('personalDetails')}>
                        <div className="icon">
                            <FaUser />
                        </div>
                        <div className="text">
                            Personal Details
                        </div>
                    </div>
                    <div className={`sidebar-item ${activeSection === 'settings' ? 'active' : ''}`} onClick={() => setActiveSection('settings')}>
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
                    {
                        activeSection === 'personalDetails' ?
                            <>
                                <div className="content-heading">
                                    Personal Details
                                </div>
                                <div className="user-card">
                                    <div className="profile-avatar">
                                        {data.user?.avatar ? (
                                            <Image className="profile-avatar-image" width={160} height={160} src={data.user.avatar} alt="User Avatar" />
                                        ) : (
                                            <div className="profile-avatar-image-alt">
                                                <FaUserCircle />
                                            </div>
                                        )}
                                        <div className="profile-avatar-edit-button" onClick={(e) => handleAvatarEditClick(e, true)}>
                                            <FaEdit />
                                        </div>
                                    </div>
                                    <div className="name">
                                        {data.user.name}
                                    </div>
                                    <div className="role">
                                        {data.role}
                                    </div>
                                </div>
                                <div className="user-info">
                                    <Input data={{
                                        user: data.user,
                                        value: data.user.name,
                                        name: "name",
                                        className: "nameInput",
                                        placeholder: "Name",
                                        icon: <FaUser />,
                                        title: "Name",
                                        referenceText: "Name",
                                        updateSession: "name",
                                        saveFunction: data.handleNameChange
                                    }} />
                                    <Input data={{
                                        user: data.user,
                                        value: data.user.userName,
                                        name: "userName",
                                        className: "userNameInput",
                                        placeholder: "Username",
                                        icon: <FaRegUser />,
                                        title: "Username",
                                        referenceText: "Username",
                                        updateSession: "userName",
                                        saveFunction: data.handleUsernameChange
                                    }} />
                                    <Input data={{
                                        user: data.user,
                                        value: data.user.number,
                                        name: "number",
                                        className: "numberInput",
                                        placeholder: "Number",
                                        icon: <FaPhoneAlt />,
                                        title: "Number",
                                        check: "number",
                                        referenceText: "Number",
                                        saveFunction: data.handleNumberChange
                                    }} />
                                    <Input data={{
                                        user: data.user,
                                        value: data.user.email,
                                        name: "email",
                                        className: "emailInput",
                                        placeholder: "Email",
                                        icon: <MdEmail />,
                                        title: "Email",
                                        check: "email",
                                        referenceText: "Email",
                                        updateSession: "email",
                                        saveFunction: data.handleEmailChange
                                    }} />
                                    <Input data={{
                                        user: data.user,
                                        value: data.user.location,
                                        name: "location",
                                        className: "locationInput",
                                        placeholder: "Location",
                                        icon: <FaLocationDot />,
                                        title: "Location",
                                        check: "location",
                                        referenceText: "Location",
                                        saveFunction: data.handleLocationChange
                                    }} />
                                </div>
                            </>
                            :
                            <></>
                    }
                    {
                        activeSection === 'settings' ?
                            <div className="settings">
                                <div className="content-heading">
                                    Settings
                                </div>
                                {/* Add your settings content here */}
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
        </main>
    )
}

export default Profile