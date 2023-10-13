import React, { useState } from 'react';

function Setting() {
  //대분류
  const [category, setCategory] = useState('');
  //대분류를 key로 갖고, 해당 대분류에 속한 소분류들을 배열로 저장
  const [subcategories, setSubcategories] = useState({});
  //소분류
  const [subcategoryInput, setSubcategoryInput] = useState('');

  //대분류 상태 업데이트
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  //소분류 상태 업데이트
  const handleSubcategoryChange = (e) => {
    setSubcategoryInput(e.target.value);
  };

  //대분류를 입력받아 subcategories 객체에 새로운 key로 추가
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    setSubcategories({...subcategories, [category]: []});
    setCategory('');
  };

  //소분류를 입력받아 subcategories 객체에 해당 대분류의 소분류 배열에 추가
  //대분류가 이미 있는 경우 해당 배열에 소분류를 추가하고,
  //없는 경우 새 배열을 만들어 소분류 추가
  const handleSubcategorySubmit = (e) => {
    e.preventDefault();
    if (subcategories[category]) {
      setSubcategories({
        ...subcategories,
        [category]: [...subcategories[category], subcategoryInput]
      });
    } else {
      setSubcategories({
        ...subcategories,
        [category]: [subcategoryInput]
      });
    }
    setSubcategoryInput('');
  };

  return (
    <div>
      <form onSubmit={handleCategorySubmit}>
        <label>
          Category : 
          <input type="text" value={category} onChange={handleCategoryChange} />
        </label>
        <button type="submit">카테고리 추가</button>
      </form>

      <form onSubmit={handleSubcategorySubmit}>
        <label>
          Todo : 
          <input type="text" value={subcategoryInput} onChange={handleSubcategoryChange} />
        </label>
        <button type="submit">할일 추가</button>
      </form>
      <ul>
        {Object.keys(subcategories).map((category, index) => (
          <li key={index}>
            {category}
            <ul>
              {subcategories[category].map((subcategory, subIndex) => (
                <li key={subIndex}>{subcategory}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <button>저장</button>
    </div>
  );
}

export default Setting;
