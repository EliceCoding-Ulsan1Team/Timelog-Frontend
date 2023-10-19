import React, { useState } from 'react';
import Category from '../Category/category';
import Timer from '../Timer/timer';

function CategoryTimer() {
    //타이머가 실행 중인지
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    //선택된 대분류를 문자열로 나타내는 상태값
    const [selectedCategory, setSelectedCategory] = useState(null);
    //선택된 소분류를 문자열로 나타내는 상태값
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    //타이머 시작 시간을 나타내는 타임스탬프 상태값
    const [startTime, setStartTime] = useState(null);

    //타이머 시작
    const startTimer = () => {
        setIsTimerRunning(true);
        setStartTime(Date.now());
    };

    //타이머 종료
    const stopTimer = () => {
        setIsTimerRunning(false);
        setStartTime(null);
    };

    return (
        <div className="App">
            <Category
                onSelectCategory={(category, subcategory) => {
                    setSelectedCategory(category);
                    setSelectedSubcategory(subcategory);
                    startTimer();
                }}
            />
            <Timer
                isRunning={isTimerRunning}
                onStopButtonClick={stopTimer}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
            />
        </div>
    );
}

export default CategoryTimer;
