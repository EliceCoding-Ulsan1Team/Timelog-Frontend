import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const storedCategories = localStorage.getItem('categories');
        const storedRecords = localStorage.getItem('timerRecords');

        if (storedCategories && storedRecords) {
            const categories = JSON.parse(storedCategories);
            const records = JSON.parse(storedRecords);

            const extractedEvents = [];

            // 로컬 스토리지에서 저장된 기록을 이벤트로 변환
            records.forEach(record => {
                const { subcategory, timestamp, time } = record;
                const eventDate = new Date(timestamp);

                extractedEvents.push({
                    title: `${subcategory} - ${time}`, // 서브카테고리와 시간을 표시
                    start: eventDate,
                    backgroundColor: 'orange',
                    textColor: 'white',
                });
            });

            // 현재 날짜의 카테고리와 서브카테고리 이벤트도 추가
            const currentDate = new Date();
            Object.keys(categories).forEach(category => {
                categories[category].forEach(subcategory => {
                    extractedEvents.push({
                        title: `${subcategory}`, // 서브카테고리만 표시
                        start: currentDate,
                        backgroundColor: 'orange',
                        textColor: 'white',
                    });
                });
            });

            setEvents(extractedEvents);
        }
    }, []);

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                start: 'title',
                end: 'timeGridDay today prev,next'
            }}
            customButtons={{
                new: {
                    text: 'new',
                    click: () => console.log('new event'),
                },
            }}
            events={events}
        />
    );
}

export default Calendar;
