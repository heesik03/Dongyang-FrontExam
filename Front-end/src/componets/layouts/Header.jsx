import { useState, useEffect } from "react";
import getScheduleList from "../getScheduleList";
import Linkli from "./Linkli"
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
    const [ scheduleList, setScheduleList ] = useState([]); 
    const [ alarmList, setAlarmList ] = useState([]); 
    const [ isAlarm, setIsAlarm ] = useState(false);
    const [ isClick, setIsClick ] = useState(false);

    const headerList = [
        {
            link : "/",
            label : "홈",
        },
        {
            link : "/note",
            label : "메모",
        },
    ]

    const clickBell = () => {
        setIsClick((click) => !click);
        if (isAlarm) {
            setIsAlarm(false) // 읽음 처리
        }
    }

    useEffect(() => {
        const intervalTime = 10000;

        getScheduleList(setScheduleList);

        const interval = setInterval(() => { // 10초다 알림 목록 업데이트
            getScheduleList(setScheduleList);
        }, intervalTime); 

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        const now = new Date();
        const nowHour = now.getHours();
        const nowMinute = now.getMinutes();
        const alarmSchedule = [];

        scheduleList.forEach(item => {
            const [itemHour, itemMinute] = item.time.split(':').map(Number);

            const isSameDate = // 현재 날짜와 같고
                item.currentDay.year === now.getFullYear() &&
                item.currentDay.month === now.getMonth() + 1 &&
                item.currentDay.day === now.getDate();

            const isEqualTime = // 현재 시간보다 적거나, 시간이 같고, 분이 작거나 같은 일정
                itemHour < nowHour || (itemHour === nowHour && itemMinute <= nowMinute);

            isSameDate && isEqualTime &&
                alarmSchedule.push(item);
            ;
        });

        if (alarmSchedule.length !== alarmList.length) { // 실시간 일정과 저장되있는 알람 리스트의 길이가 다르다(변화가 생겼다)면
            setAlarmList(alarmSchedule); // 알람 리스트 갱신
            if (alarmSchedule.length > alarmList.length) { // 일정이 추가되었다면
                setIsAlarm(true);                    
            }
        }
    }, [scheduleList]);


    return (
        <header>
            <nav className="navbar container d-flex">
                <ul className="d-flex">
                {
                    headerList.map( list => (
                        <Linkli key={list.label} link={list.link} label={list.label} />
                    ))
                }
                </ul>
                <div>
                    <i className={`${isAlarm ? "alarm-active bi bi-bell-fill" : "bi bi-bell"} ms-auto`} 
                    style={{fontSize : "1.8em"}}
                    onClick={clickBell} />
                    <ul className="alarm-page position-absolute end-0 z-3">
                    {
                        isClick && (
                            alarmList.length === 0 ? <li>일정이 없습니다.</li> 
                            : alarmList.sort((a, b) => a.time.localeCompare(b.time))
                                .map( (item, index ) => (
                                <li key={item.id}>
                                    <p className="alarm-item py-1">
                                        <span style={{ 
                                            color: item.important ? "#ec5353" : "black", 
                                            fontWeight: item.important ? "bold" : "normal" 
                                        }}>
                                            {item.important && "중요!"}
                                        </span>
                                        &nbsp; {`${index+1}. ${item.time} ${item.schedule}`}
                                    </p>
                                </li>
                            ))
                        )
                    }
                    </ul>
                </div>
            </nav>
            <hr />
        </header>
    )
}

export default Header;