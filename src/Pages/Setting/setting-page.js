import React, { useState } from 'react';

function Setting({ onSave }) {
  const [category, setCategory] = useState('');
  const [subcategoryInput, setSubcategoryInput] = useState('');

  const [subcategories, setSubcategories] = useState({});

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubcategoryChange = (e) => {
    setSubcategoryInput(e.target.value);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    setSubcategories({ ...subcategories, [category]: [] });
    setCategory('');
  };

  const handleSubcategorySubmit = (e) => {
    e.preventDefault();
    if (subcategories[category]) {
      setSubcategories({
        ...subcategories,
        [category]: [...subcategories[category], subcategoryInput],
      });
    } else {
      setSubcategories({
        ...subcategories,
        [category]: [subcategoryInput],
      });
    }
    setSubcategoryInput('');
  };

  const handleSave = () => {
    onSave(subcategories);
  };

  return (
    <div>
      <form onSubmit={handleCategorySubmit}>
        <label>
          Category :
          <input type="text" value={category} onChange={handleCategoryChange} />
        </label>
        <button type="submit">대분류 추가</button>
      </form>

      <form onSubmit={handleSubcategorySubmit}>
        <label>
          Todo :
          <input type="text" value={subcategoryInput} onChange={handleSubcategoryChange} />
        </label>
        <button type="submit">소분류 추가</button>
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

      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default Setting;
