import React, { useState } from 'react';
import Timer from '../Timer/timer';

const Category = () => {
    const [inputValue, setInputValue] = useState('');
    const [workList, setWorkList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setWorkList([...workList, {value: inputValue}]);
        setInputValue('');
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>카테고리 별 시간재기</h2>
                <input
                    type='text'
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <button type='submit'>등록</button>
            </form>

            <ul>
                {workList.map((item, index) => (
                    <li key={index}>
                        <span>{item.value}</span>
                        <Timer />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Category;