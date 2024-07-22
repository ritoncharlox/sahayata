import React, { useEffect, useRef, useState } from 'react'
import "./Input.css";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FadeLoader } from 'react-spinners';
import { MdError } from 'react-icons/md';

const Input = ({ data }) => {
    const [value, setValue] = useState(data.value);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputInfo, setInputInfo] = useState('');
    const [inputError, setInputError] = useState('');

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
            setInputInfo("Name updated successfully");

            setTimeout(() => {
                setLoading(false);
            }, 2000);

            setEditMode(false);
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

        if (dataChange.nameChangeError) {
            setInputError(dataChange.nameChangeError);

            setTimeout(() => {
                setLoading(false);
            }, 2000);

            setEditMode(false);
            return;
        }

        setLoading(false);
    }

    const editHandler = () => {
        setEditMode(true);
        setInputInfo('');
        setInputError('');
    }

    return (
        <div className={`input-main ${data.className}`}>
            <div className="title">
                <div className="icon">{data.icon}</div>
                <div className="text">{data.title}</div>
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
            <div className="input">
                {
                    editMode ?
                        <input type="text" className='value-input' value={value} ref={inputRef} onChange={(e) => setValue(e.target.value)} />
                        :
                        <div className="value">{data.value}</div>
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
        </div>
    )
}

export default Input