import React, { useState } from 'react'
import "./Input.css";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

const Input = ({ data }) => {
    const [value, setValue] = useState(data.value);
    const [editMode, setEditMode] = useState(false);
    // console.log(value);

    const editHandler = () => {
        setEditMode(true);
    }

    const saveHandler = () => {
        setEditMode(false);
    }

    return (
        <div className={`input-main ${data.className}`}>
            <div className="title">
                <div className="icon">{data.icon}</div>
                <div className="text">{data.title}</div>
            </div>
            <div className="input-line"></div>
            <div className="input">
                <div className="value">{data.value}</div>
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