import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Setting() {

    //대분류, 소분류 상태 초기값
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');

    //저장할 완성 카테고리 상태 초기값
    //형태 : 소분류의 key가 대분류인 배열
    const [categories, setCategories] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
        }
    }, []);


    //대분류, 소분류 입력 상태 업데이트
    const handleCategoryInput = (e) => {
        setCategory(e.target.value);
    };

    const handleSubcategoryInput = (e) => {
        setSubcategory(e.target.value);
    };

    //대분류를 입력받아 categories 객체에 새로운 key로 추가
    //대분류, 소분류 form 제출 시 상태
    //소분류의 key값을 대분류로 가지는 배열
    const handleCategorySubmit = (e) => {
        e.preventDefault();

        setCategories({ ...categories, [category]: [] });
        setCategory('');
    };

    //대분류가 이미 있는 경우 해당 배열에 소분류 추가,
    //없는 경우 새 배열을 만들어 소분류 추가
    const handleSubcategorySubmit = (e) => {
        e.preventDefault();

        if (categories[category]) {
            setCategories({
                ...categories,
                [category]: [...categories[category], subcategory],
            });
        } else {
            setCategories({
                ...categories,
                [category]: [subcategory],
            });
        }
        setSubcategory('');
    };

    //저장 버튼 클릭
    const handleSave = () => {
        localStorage.setItem('categories', JSON.stringify(categories));
        navigate('/main');
    };

    return (
        <div>
            <h1>Setting 페이지</h1>
            <form onSubmit={handleCategorySubmit}>
                <h2>
                    Category
                </h2>
                <input type="text" value={category} onInput={handleCategoryInput} />
                <button type="submit">대분류 추가</button>
            </form>

            <form onSubmit={handleSubcategorySubmit}>
                <h2>
                    subCategory - Todo
                </h2>
                <input type="text" value={subcategory} onInput={handleSubcategoryInput} />
                <button type="submit">소분류 추가</button>
            </form>

            <ul>
                {Object.keys(categories).map((category, index) => (
                    <li key={index}>
                        {category}
                        <ul>
                            {categories[category].map((subcategory, subIndex) => (
                                <li key={subIndex}>{subcategory}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default Setting;