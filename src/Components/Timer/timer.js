import React, { useState, useEffect, useCallback } from 'react';

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [record, setRecord] = useState([]);
  const [showRecord, setShowRecord] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const currentTime = (t) => {
    const ms = t % 1000;
    const s = Math.floor((t / 1000) % 60);
    const m = Math.floor((t / (1000 * 60)) % 60);
    const h = Math.floor(t / (1000 * 60 * 60));

    return `${h < 10 ? '0':''}${h}:${m < 10 ? '0':''}${m}:${s < 10 ? '0':''}${s}:${ms < 100 ? '0':''}${ms}`;
  }

  const handleClick = () => {
    setIsRunning(!isRunning);
  }

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setRecord([]);
    setShowRecord(false);
  }

  const handleRecord = () => {
    setRecord([...record, time]);
    setShowRecord(true);
  };


  const handleRemoveClick = useCallback((index) => {
      setRecord((current) => {
        const newList = [...current];
        newList.splice(index, 1);
        return newList;
      });
    },[]);

  return (
    <div className='stopwatch'>
      <div>{currentTime(time)}</div>
      <button onClick={handleClick}>{isRunning ? '종료' : '시작'}</button>
      <button onClick={handleReset}>초기화</button>
      <button onClick={handleRecord}>시간 저장</button>
      {showRecord && (
        <div>시간 기록:
          <ul>
            {record.map((time, index) => (
              <li key={index}>{currentTime(time)}
               <button onClick={() => handleRemoveClick(index)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Timer;
