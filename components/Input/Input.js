import React, { useEffect, useRef, useState } from 'react'
import "./Input.css";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FadeLoader } from 'react-spinners';
import { MdError } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

const Input = ({ data }) => {
    const [value, setValue] = useState(data.value || '');
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputInfo, setInputInfo] = useState('');
    const [inputError, setInputError] = useState('');
    const [addMode, setAddMode] = useState(false);
    const [updatedValue, setUpdatedValue] = useState('');
    const [user, setUser] = useState({});

    const router = useRouter();

    const { data: session, update } = useSession();

    useEffect(() => {
        if (session && session.user) {
            setUser(session.user);
        }
    }, [session]);

    let dataCheck = {
        check: data.check,
    }

    if (data.check && data.check === "number") {

        if (!data.user.number) {
            dataCheck.notSet = true;
        }

        if (!data.user.isNumberVerified) {
            dataCheck.notVerified = true;
            dataCheck.verifyLink = '/number-verification'
        }

        if (data.user.number && data.user.isNumberVerified) {
            dataCheck.showVerified = true;
        }

    }

    if (data.check && data.check === "email") {

        if (!data.user.email) {
            dataCheck.notSet = true;
        }

        if (!data.user.isEmailVerified) {
            dataCheck.notVerified = true;
            dataCheck.verifyLink = '/email-verification'
        }

        if (data.user.email && data.user.isEmailVerified) {
            dataCheck.showVerified = true;
        }

    }

    if (data.check && data.check === "location") {

        if (!data.user.location) {
            dataCheck.notSet = true;
        }

    }

    // console.log(dataCheck);

    const inputRef = useRef();
    // console.log(value);

    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editMode]);

    const saveHandler = async () => {

        if (loading) {
            return;
        }

        setLoading(true);

        const dataChange = await data.saveFunction(data.user, value);

        // console.log(dataChange);

        if (dataChange.success) {
            setInputInfo(`${data.referenceText} updated successfully`);

            setTimeout(async () => {
                router.refresh();
                setLoading(false);

                if (data.updateSession) {
                    // await update({
                    //     ...session,
                    //     user: {
                    //         ...session?.user,
                    //         [data.updateSession]: value
                    //     }
                    // })
                    await update({
                        ...session,
                        user: {
                            ...session?.user,
                            userName: "Hi"
                        }
                    })
                }

            }, 2000);

            setEditMode(false);
            setUpdatedValue(value);
            return;
        }

        if (dataChange.error) {
            setInputError("Something went wrong, please try again after a while");

            setTimeout(() => {
                setLoading(false);
            }, 2000);

            setEditMode(false);
            return;
        }

        if (dataChange.changeError) {
            setInputError(dataChange.changeError);

            setTimeout(() => {
                setLoading(false);
            }, 2000);

            setEditMode(false);
            return;
        }

        setLoading(false);
    }

    // console.log(session);

    const editHandler = () => {
        setEditMode(true);
        setInputInfo('');
        setInputError('');
    }

    const addSaveHandler = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        const dataChange = await data.saveFunction(data.user, value);

        // console.log(dataChange);

        if (dataChange.success) {
            setInputInfo(`${data.referenceText} updated successfully`);

            setTimeout(() => {
                setLoading(false);
            }, 2000);

            setAddMode(false);
            return;
        }

        if (dataChange.error) {
            setInputError("Something went wrong, please try again after a while");

            setTimeout(() => {
                setLoading(false);
            }, 2000);

            setAddMode(false);
            return;
        }

        if (dataChange.changeError) {
            setInputError(dataChange.changeError);

            setTimeout(() => {
                setLoading(false);
            }, 2000);

            setAddMode(false);
            return;
        }

        setLoading(false);
    }

    const addClickHandler = async () => {
        setAddMode(true);
        setInputInfo('');
        setInputError('');
    }

    // console.log(dataCheck);

    return (
        <div className={`input-main ${data.className}`}>
            <div className="title">
                <div className="icon">{data.icon}</div>
                <div className="text">{data.title}</div>
                {
                    dataCheck.check && dataCheck.notSet ?
                        <>
                            <div className="title-line"></div>
                            <div className="info">
                                Not Set
                            </div>
                        </>
                        :
                        <>
                            {
                                dataCheck.check && dataCheck.notVerified ?
                                    <>
                                        <div className="title-line"></div>
                                        {/* <div className="info">
                                            Not Verified
                                        </div> */}
                                        <Link href={`${dataCheck.verifyLink}?redirectTo=/profile`} className='verify-link'>Verify</Link>
                                    </>
                                    :
                                    <>
                                        {
                                            dataCheck.check && dataCheck.showVerified ?
                                                <>
                                                    <div className="title-line verified"></div>
                                                    <div className="info verified">
                                                        <div className="verify-icon">
                                                            <FaCheckCircle />
                                                        </div>
                                                        <div className="text">
                                                            Verified
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <></>
                                        }
                                    </>
                            }
                        </>
                }
            </div>
            {
                loading ?
                    <div className="input-info">
                        {
                            inputInfo ?
                                <div className="info-field">
                                    <div className="icon">
                                        <FaCheckCircle />
                                    </div>
                                    <div className="text">
                                        {inputInfo}
                                    </div>
                                </div>
                                :
                                <>
                                    {
                                        inputError ?
                                            <div className="error-field">
                                                <div className="icon">
                                                    <MdError />
                                                </div>
                                                <div className="text">
                                                    {inputError}
                                                </div>
                                            </div>
                                            :
                                            <>
                                                <FadeLoader color='var(--theme-color)' />
                                            </>
                                    }
                                </>
                        }
                    </div>
                    :
                    <></>
            }
            <div className="input-line"></div>
            {
                dataCheck.check && dataCheck.notSet ?
                    <>
                        {
                            addMode ?
                                <div className="input">
                                    <input type="text" className='value-input' value={value} ref={inputRef} placeholder={data.placeholder} onChange={(e) => setValue(e.target.value)} />
                                    <button className="button" onClick={addSaveHandler}>
                                        <FaSave />
                                    </button>
                                </div>
                                :
                                <button className='add-button' onClick={addClickHandler}>
                                    Add {data.referenceText}
                                </button>
                        }
                    </>
                    :
                    <div className="input">
                        {
                            editMode ?
                                <input type="text" className='value-input' value={value} ref={inputRef} placeholder={data.placeholder} onChange={(e) => setValue(e.target.value)} />
                                :
                                <div className="value">{updatedValue || data.value}</div>
                        }
                        {
                            editMode ?
                                <button className="button" onClick={saveHandler}>
                                    <FaSave />
                                </button>
                                :
                                <button className="button" onClick={editHandler}>
                                    <FaEdit />
                                </button>
                        }
                    </div>
            }
        </div>
    )
}

export default Input