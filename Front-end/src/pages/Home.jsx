import { useState, useEffect } from "react";
import axios from "axios";
import CalendarBody from "../componets/CalendarBody";

function Home() {
    const now = new Date();
    const [ currentDay, setCurrentDay ] = useState({ // 캘린더의 현재 날짜
        year : now.getFullYear(),
        month : now.getMonth()+1,
        day : now.getDate()
    });
    const [ firstWeek, setFirstWeek ] = useState(new Date(currentDay.year, currentDay.month-1, 1).getDay()); // 첫날의 요일
    const [ lastDay, setLastDay ] = useState(new Date(currentDay.year, currentDay.month, 0).getDate()); // 선택한 월의 말일
    const [ time, setTime ] = useState(""); // 일정의 시간
    const [ schedule, setSchedule] = useState(""); // 일정의 내용
    const [ scheduleList, setScheduleList] = useState([]);

    const weekList = ['일', '월', '화', '수', '목', '금', '토'];

    const changeCurrentMonth = move => {
        let year = currentDay.year;
        let month = currentDay.month;

        move ? month-=1 : month+=1;
        if (month<=0) { // 년도 내림
            year-=1;
            month=12;
        } else if (month>=13) { // 년도 올림
            year+=1;
            month=1;
        }
        setCurrentDay({year, month, day : 1});
        setFirstWeek(new Date(year, month-1, 1).getDay())
        setLastDay(new Date(year, month, 0).getDate())
    }

    const getScheduleList = async() => {
        try {
            const scheduleData = await axios.get('http://localhost:3000/schedules');
            setScheduleList(scheduleData.data);
        } catch (error) {
            console.error(`getScheduleList Error : ${error}`);
            alert("사이트 오류로 일정 불러오기에 실패했습니다.");
        }
    }

    const onSubmitSchedule = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/schedules', {
                currentDay,
                time,
                schedule
            })
            setTime("")
            setSchedule("")
        } catch (error) {
            console.error(`onSubmitSchedule Error : ${error}`);
            alert("사이트 오류로 일정 작성에 실패했습니다.");
        }
    }

    useEffect(() => {
        getScheduleList();
    }, [])

    return (
        <main className="container">
            <h1>메인페이지</h1>
            <section>
                <p>여기에 캘린더를 둡니다</p>
                <br />

                <p>{`오늘 날짜 : ${now.getFullYear()}년 ${now.getMonth()+1}월 ${now.getDate()}일`}</p>
                <p>{`${currentDay.year}년 ${currentDay.month}월`}</p>

                <button type="button" onClick={() => changeCurrentMonth(true)}>⬅️</button>
                <br />
                <table id="calendar" style={{textAlign : "center"}}>
                    <thead>
                        <tr>
                            {weekList.map(week => (
                                <th key={week}>{week}</th>
                            ))}
                        </tr>
                    </thead>
                    <CalendarBody
                        lastDay={lastDay}
                        firstWeek={firstWeek}
                        currentDay={currentDay}
                        setCurrentDay={setCurrentDay}
                    />
                </table>
                <button type="button" onClick={() => changeCurrentMonth(false)}>➡️</button> 
                <br /> 
                <hr />
                <form onSubmit={(e) => onSubmitSchedule(e)}>
                    <p>{`${currentDay.year}년 ${currentDay.month}월 ${currentDay.day}일`}</p>
                    
                    <label className="form-label"
                        htmlFor="schedule-time">
                        시간
                    </label>
                    <input className="ms-2"
                        type="time"
                        id="schedule-time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)} />
                    <br />

                    <label className="form-label"
                        htmlFor="schedule">
                        일정
                    </label>
                    <textarea className="ms-2"
                        id="schedule" 
                        rows="3" 
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)} />
                    <br />

                    <button type="submit">제출</button>
                </form>
                <br />

                <h3>일정 목록</h3>
                <ul>
                {
                    scheduleList.map(item => (
                        <li key={item.id}>
                            <p>{`${item.currentDay.year}년 ${item.currentDay.month}월 ${item.currentDay.day}일`}</p>
                            <p>{item.time} {item.schedule}</p>
                            <hr />
                        </li>
                    ))
                }
                </ul>
            </section>
            <section>
                <p>뉴스기사 크롤링을 둡니다.</p>  
            </section>
        </main>
    );
}

export default Home;