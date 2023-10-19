import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../Components/Calendar/calendar';
import CategoryTimer from '../../Components/CategoryTimer.js/cateogrytimer';
import './main-page.css';

function MainPage() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/setting');
    }

    return (
        <div className='container'>
            <div className='calendar'>
                <Calendar />
            </div>
            <div className='category'>
                <CategoryTimer />
                <button onClick={handleClick}>Setting</button>
            </div>
        </div>
    )
}

export default MainPage;