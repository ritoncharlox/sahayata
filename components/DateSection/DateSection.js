"use client"
import { useState, useEffect } from 'react';
import "./DateSection.css";

const DateSection = ({orderDate, setOrderDate}) => {
    const [todayLabel, setTodayLabel] = useState('');
    const [tomorrow1Label, setTomorrow1Label] = useState('');
    const [tomorrow2Label, settomorrow2Label] = useState('');
    const [tomorrow3Label, settomorrow3Label] = useState('');
    const [tomorrow4Label, settomorrow4Label] = useState('');
    const [tomorrow5Label, settomorrow5Label] = useState('');

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };

    const setDate = (offset) => {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        setOrderDate(formatDate(date));
        // setSelectedDate(formatDate(date));
    };

    useEffect(() => {
        const today = new Date();
        const tomorrow1 = new Date();
        const tomorrow2 = new Date();
        const tomorrow3 = new Date();
        const tomorrow4 = new Date();
        const tomorrow5 = new Date();
        tomorrow1.setDate(today.getDate() + 1);
        tomorrow2.setDate(today.getDate() + 2);
        tomorrow3.setDate(today.getDate() + 3);
        tomorrow4.setDate(today.getDate() + 4);
        tomorrow5.setDate(today.getDate() + 5);

        // setOrderDate(formatDate(today));
        setTodayLabel(formatDate(today));
        setTomorrow1Label(formatDate(tomorrow1));
        settomorrow2Label(formatDate(tomorrow2));
        settomorrow3Label(formatDate(tomorrow3));
        settomorrow4Label(formatDate(tomorrow4));
        settomorrow5Label(formatDate(tomorrow5));
    }, []);

    return (
        <div className='date-selector'>
            <button type='button' className={orderDate ==todayLabel ? "date-day-btn selected-btn" : "date-day-btn"} onClick={() => setDate(0)}>
                <div className="weekday">{todayLabel.slice(0, 3)}</div>
                <div className="date-day">{todayLabel.slice(-2)}</div>
            </button>
            <button type='button' className={orderDate ==tomorrow1Label ? "date-day-btn selected-btn" : "date-day-btn"} onClick={() => setDate(1)}>
                <div className="weekday">{tomorrow1Label.slice(0, 3)}</div>
                <div className="date-day">{tomorrow1Label.slice(-2)}</div>
            </button>
            <button type='button' className={orderDate ==tomorrow2Label ? "date-day-btn selected-btn" : "date-day-btn"} onClick={() => setDate(2)}>
                <div className="weekday">{tomorrow2Label.slice(0, 3)}</div>
                <div className="date-day">{tomorrow2Label.slice(-2)}</div>
            </button>
            <button type='button' className={orderDate ==tomorrow3Label ? "date-day-btn selected-btn" : "date-day-btn"} onClick={() => setDate(3)}>
                <div className="weekday">{tomorrow3Label.slice(0, 3)}</div>
                <div className="date-day">{tomorrow3Label.slice(-2)}</div>
            </button>
            <button type='button' className={orderDate ==tomorrow4Label ? "date-day-btn selected-btn" : "date-day-btn"} onClick={() => setDate(4)}>
                <div className="weekday">{tomorrow4Label.slice(0, 3)}</div>
                <div className="date-day">{tomorrow4Label.slice(-2)}</div>
            </button>
            <button type='button' className={orderDate ==tomorrow5Label ? "date-day-btn selected-btn" : "date-day-btn"} onClick={() => setDate(5)}>
                <div className="weekday">{tomorrow5Label.slice(0, 3)}</div>
                <div className="date-day">{tomorrow5Label.slice(-2)}</div>
            </button>
        </div>
    );
};

export default DateSection;
