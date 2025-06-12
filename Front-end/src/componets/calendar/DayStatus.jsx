const DayStatus = ({now, scheduleList}) => {

    const isTodayList = scheduleList.filter( item => // 오늘 하루 일정
        (item.currentDay.year === now.getFullYear() || item.birthday) &&
        item.currentDay.month === now.getMonth()+1 &&
        item.currentDay.day === now.getDate() 
    )

    const isBirthDay = scheduleList.some(item => // 생일 여부 검사
        item.birthday &&
        item.currentDay.month === now.getMonth()+1 &&
        item.currentDay.day === now.getDate() 
    ); 

    const isImportantDay = isTodayList.some(item => // 오늘 중요 일정이 1개라도 있다면
        item.important
    );

    const isBusy = isTodayList.length>=5;

    return (
        <section>
            {
                isBirthDay && <h4 className="fw-bold">🎉 생일 축하드립니다!! 🎉</h4>
            }
            <h4 className="fw-bold">
            {
                isImportantDay ? 
                    "🔥 오늘은 중요 일정이 있으니, 잊지 말아 주세요!" :
                    isBusy ? "🏃 바쁜 날입니다!" : "📌 오늘도 즐거운 하루 되세요~"
            }
            </h4>
            <hr />
        </section>
    )
}

export default DayStatus;