import React, { useState, useEffect } from 'react';

const Timer = (props) => {
    //경과
    const [elapsedTime, setElapsedTime] = useState(0);
    //타이머의 실행 여부
    const [isRunning, setIsRunning] = useState(false);
    //저장된 시간
    const [savedTime, setSavedTime] = useState(null);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 로컬 스토리지에서 저장된 시간을 읽어와 상태로 설정
        const savedRecords = JSON.parse(localStorage.getItem('timerRecords')) || [];
        const lastRecord = savedRecords[savedRecords.length - 1]; // 마지막 저장된 기록을 가져옴
        if (lastRecord && lastRecord.category === props.selectedCategory && lastRecord.subcategory === props.selectedSubcategory) {
            setSavedTime(lastRecord.time);
        } else {
            setSavedTime(null); // 선택된 카테고리와 서브카테고리에 대한 저장된 기록이 없으면 null로 설정
        }
    }, [props.selectedCategory, props.selectedSubcategory]);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    //타이머 시작, 종료
    const handleStartClick = () => {
        setIsRunning(!isRunning);
    };

    //타이머 종료, saveRecord로 로컬 스토리지 저장
    const handleStopClick = () => {
        setIsRunning(false);
        saveRecord();
    };

    //타이머 초기화
    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
    };

    //시간을 문자열로
    const formatElapsedTime = (time) => {
        const ms = time % 1000;
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor(time / (1000 * 60 * 60));

        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${ms < 100 ? '0' : ''}${ms}`;
    };

    //로컬 스토리지 저장
    const saveRecord = () => {
        if (props.selectedCategory && props.selectedSubcategory) {
            const currentTime = formatElapsedTime(elapsedTime);
            const timestamp = new Date().toISOString();
            const newRecord = {
                category: props.selectedCategory,
                subcategory: props.selectedSubcategory,
                time: currentTime,
                timestamp: timestamp
            };
            const savedRecords = JSON.parse(localStorage.getItem('timerRecords')) || [];
            savedRecords.push(newRecord);
            localStorage.setItem('timerRecords', JSON.stringify(savedRecords));
        } else {
            console.log('실패');
        }
    };

    return (
        <div className='timer'>
        <h1>타이머</h1>
        <div>저장된 시간: {savedTime}</div>
        <div>{formatElapsedTime(elapsedTime)}</div>
        {isRunning ? (
            <button onClick={handleStopClick}>종료</button>
        ) : (
            <button onClick={handleStartClick}>시작</button>
        )}
        <button onClick={handleReset}>초기화</button>
    </div>
    );
};

export default Timer;
