import React, { useState } from 'react';
import Calendar from '../../Components/Calendar/calendar';
import Category from '../../Components/Category/category';
import Setting from '../Setting/setting-page';
import './main-page.css';

function Main() {
    const [showSetting, setShowSetting] = useState(false);
  const [categories, setCategories] = useState({});
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);


  const handleSettingButtonClick = () => {
    setShowSetting(!showSetting);
  };

  const handleSaveSetting = (newCategories) => {
    setCategories(newCategories);
    setShowSetting(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    // 이미 선택된 소분류라면 제거, 아니면 추가
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter(sub => sub !== subcategory));
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };


    return (
        <div className='container'>
      <div className='calendar'>
        <Calendar />
      </div>
      <div className='Category'>
        {showSetting && <Setting onSave={handleSaveSetting} />}
        <button onClick={handleSettingButtonClick}>Setting</button>
        <Category categories={categories} selectedSubcategories={selectedSubcategories} onSubcategoryClick={handleSubcategoryClick} />
      </div>
    </div>
    );
}

export default Main;
