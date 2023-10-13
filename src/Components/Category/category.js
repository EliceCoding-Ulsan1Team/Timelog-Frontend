import React, { useState } from 'react';
import Timer from '../Timer/timer';

function Category({ categories }) {
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const handleButtonClick = (subcategory) => {
    // 이미 선택된 소분류라면 제거, 아니면 추가
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter(sub => sub !== subcategory));
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  return (
    <div>
      {Object.keys(categories).map((category, index) => (
        <div key={index}>
          <h2>{category}</h2>
          <div>
            {categories[category].map((subcategory, subIndex) => (
              <div key={subIndex}>
                <button onClick={() => handleButtonClick(subcategory)}>{subcategory}</button>
                {selectedSubcategories.includes(subcategory) && <Timer />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Category;
