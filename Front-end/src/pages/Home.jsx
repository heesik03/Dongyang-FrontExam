import { useState } from "react";

function Home() {
    const now = new Date();
    const [currentDay, setCurrentDay] = useState({ // 캘린더의 현재 날짜
        year : now.getFullYear(),
        month : now.getMonth()+1,
        day : now.getDate()
    })
    const [lastDay, setLastDay] = useState(new Date(currentDay.year, currentDay.month, 0).getDate()) // 선택한 월의 말일
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
        setLastDay(new Date(year, month, 0).getDate())
    }

    return (
        <main>
            <h1>메인페이지</h1>
            <p>여기에 캘린더를 둡니다</p>
            <p>뉴스기사 크롤링도 둡니다</p>  
            <br />

            <p>{`오늘 날짜 : ${now.getFullYear()}년 ${now.getMonth()+1}월 ${now.getDate()}일`}</p>
            <p>{`선택한 날짜 : ${currentDay.year}년 ${currentDay.month}월 ${currentDay.day}일`}</p>
            <p>{`${currentDay.year}년 ${currentDay.month}월`}</p>

            <button type="button" onClick={() => changeCurrentMonth(true)}>⬅️</button>
            <table id="calender">
                <thead>
                <tr>
                    {
                        weekList.map(week => (
                            <th scope="col" key={week}>{week}</th>
                        ))
                    }
                </tr>
                </thead>
            </table>
            {
                Array.from({ length: lastDay }, (_, dayIndex) => ( // 배열 생성
                    <span key={dayIndex} onClick={() => setCurrentDay({...currentDay, day : dayIndex + 1})}>
                        {dayIndex + 1}\
                    </span>
                ))
            }
            <br />
            <button type="button" onClick={() => changeCurrentMonth(false)}>➡️</button>   
             
        </main>
    );
}

export default Home;