import React, { useState, useEffect } from 'react';

function Category(props) {
    const [categories, setCategories] = useState({});
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
        }
    }, []);

    const handleSubcategoryClick = (category, subcategory) => {
        const savedRecords = JSON.parse(localStorage.getItem('timerRecords')) || [];

        // 마지막으로 저장된 기록을 찾음
        const lastRecord = savedRecords.reverse().find(item => item.category === category && item.subcategory === subcategory);
        savedRecords.reverse(); // 배열을 다시 원래 순서로 되돌림

        setSelectedTime(lastRecord ? lastRecord.time : null);
        props.onSelectCategory(category, subcategory);
        setSelectedButton(subcategory); // 클릭된 버튼을 기억하여 상태로 설정
    };

    return (
        <div>
            <h1>카테고리 + 타이머</h1>
            <ul>
                {Object.keys(categories).map((category, index) => (
                    <li key={index}>
                        <h2>{category}</h2>
                        <ul>
                            {categories[category].map((subcategory, subIndex) => (
                                <li key={subIndex}>
                                    <button
                                        onClick={() => handleSubcategoryClick(category, subcategory)}
                                        style={{
                                            backgroundColor: selectedButton === subcategory ? 'orange' : '',
                                            color: 'black',
                                        }}
                                    >
                                        {subcategory}
                                    </button>
                                    {selectedTime && <div>저장된 시간: {selectedTime}</div>}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Category;
