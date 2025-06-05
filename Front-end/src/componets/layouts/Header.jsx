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

    useEffect(() => {
        const intervalTime = 60000;

        getScheduleList(setScheduleList);

        const interval = setInterval(() => {
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

            const isSameDate =
                item.currentDay.year === now.getFullYear() &&
                item.currentDay.month === now.getMonth() + 1 &&
                item.currentDay.day === now.getDate();

            const isEqualTime =
                itemHour < nowHour || (itemHour === nowHour && itemMinute <= nowMinute);

            isSameDate && isEqualTime &&
                alarmSchedule.push(item);
            ;
        });

        if (alarmSchedule.length!==0) {
            setAlarmList(alarmSchedule)
            setIsAlarm(true)
        }
    }, [scheduleList]);


    return (
        <header>
            <nav className="navbar container d-flex mt-1">
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
                    onClick={() => setIsClick((click) => !click)} />
                    <ul className="alarm-page position-absolute end-0 z-3">
                    {
                        isClick && (
                            alarmList.length === 0 ? <li>일정이 없습니다.</li> 
                            : alarmList.map( item => (
                                <li key={item.id}>
                                    <p className="mb-0">
                                        <span style={{ 
                                            color: item.important ? "#ec5353" : "black", 
                                            fontWeight: item.important ? "bold" : "normal" 
                                        }}>
                                            {item.important && "중요!  "}
                                        </span>
                                        {item.time} {item.schedule}
                                    </p>
                                    <hr className="mt-0 mb-1" />
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