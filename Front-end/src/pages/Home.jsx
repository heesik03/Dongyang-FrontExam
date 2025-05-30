import { useState, useEffect } from "react";
import axios from "axios";
import PageMainTitle from "../componets/PageMainTitle";
import ArrowButton from "../componets/calendar/ArrowButton";
import CalendarBody from "../componets/calendar/CalendarBody";
import ScheduleForm from "../componets/calendar/ScheduleForm";

function Home() {
    const now = new Date();
    const [ currentDay, setCurrentDay ] = useState({ // 캘린더의 현재 날짜
        year : now.getFullYear(),
        month : now.getMonth()+1,
        day : now.getDate()
    });
    const [ schedule, setSchedule ] = useState({ // 일정
        description  : "",
        time : "",
        isImportant : false
    })
    const [ firstWeek, setFirstWeek ] = useState(new Date(currentDay.year, currentDay.month-1, 1).getDay()); // 첫날의 요일
    const [ lastDay, setLastDay ] = useState(new Date(currentDay.year, currentDay.month, 0).getDate()); // 선택한 월의 말일
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

    const rollbackMonth = () => {
        setCurrentDay({
            year : now.getFullYear(),
            month : now.getMonth()+1,
            day : now.getDate() 
        })
        setFirstWeek(new Date(now.getFullYear(), now.getMonth(), 1).getDay())
        setLastDay(new Date(now.getFullYear(), now.getMonth()+1, 0).getDate())
    }

    const getScheduleList = async() => {
        try {
            const responseListData = await axios.get('http://localhost:3000/schedules');
            setScheduleList(responseListData.data);
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
                time : schedule.time,
                schedule : schedule.description,
                important : schedule.isImportant
            })
            setSchedule({ description  : "", time : "", isImportant : false})
            getScheduleList();
        } catch (error) {
            console.error(`onSubmitSchedule Error : ${error}`);
            alert("사이트 오류로 일정 작성에 실패했습니다.");
        }
    }

    const deleteSchedule = async(id) => {
        try {
            await axios.delete(`http://localhost:3000/schedules/${id}`);
            setScheduleList(scheduleList.filter(item => item.id !== id));
        } catch (error) {
            console.error(`deleteSchedule Error : ${error}`);
            alert("사이트 오류로 일정 삭제에 실패했습니다.");
        }
    }

    useEffect(() => {
        getScheduleList();
    }, [])

    return (
        <main className="container">
            <section>
                <PageMainTitle title={"캘린더"} />

                <h4>{`🗓 ${now.getFullYear()}년 ${now.getMonth()+1}월 ${now.getDate()}일`}</h4>
                <br />
                <p className="text-center fw-bold" style={{fontSize : "1.4em"}}>{`${currentDay.year}년 ${currentDay.month}월`}</p>

                <div className="d-flex justify-content-center">
                    <table className="table" style={{width : "70%", fontSize : "1.2em"}}>
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
                </div>

                <div className="text-center my-3">
                    <ArrowButton arrow={"⬅️"} onClick={() => changeCurrentMonth(true)} />
                    <ArrowButton arrow={"➡️"} onClick={() => changeCurrentMonth(false)} />
                    <ArrowButton arrow={"🔄"} onClick={rollbackMonth} />
                </div>
                <hr />

                <ScheduleForm 
                    onSubmit={onSubmitSchedule} 
                    currentDay={currentDay}
                    schedule={schedule}
                    setSchedule={setSchedule} />
                <hr />

                <h3>일정 목록</h3>
                <ul>
                {
                    scheduleList.filter(item =>
                    item.currentDay.year === currentDay.year &&
                    item.currentDay.month === currentDay.month &&
                    item.currentDay.day === currentDay.day
                    ).length === 0 ? (
                        <li>
                            <h4 className="fw-bold my-4">❗일정이 없습니다</h4>
                        </li>
                    ) : (
                    scheduleList
                        .filter(item =>
                        item.currentDay.year === currentDay.year &&
                        item.currentDay.month === currentDay.month &&
                        item.currentDay.day === currentDay.day
                        )
                        .sort((a, b) => a.time.localeCompare(b.time)) // 시간 기준 오름차순 정렬
                        .map(item => (
                            <li key={item.id} className="schedule-item">
                                <p>{`${item.currentDay.year}년 ${item.currentDay.month}월 ${item.currentDay.day}일`}</p>
                                <p>
                                    <span style={{ 
                                        color: item.important ? "#ec5353" : "black", 
                                        fontWeight: item.important ? "bold" : "normal" 
                                    }}>
                                        {item.important && "중요!  "}
                                    </span>
                                    {item.time} {item.schedule}
                                    <button
                                        className="btn btn-outline-danger btn-sm ms-2"
                                        type="button"
                                        onClick={() => deleteSchedule(item.id)}
                                    >
                                        X
                                    </button>
                                </p>
                                <hr />
                            </li>
                        ))
                    )
                }
                </ul>

            </section>
        </main>
    );
}

export default Home;