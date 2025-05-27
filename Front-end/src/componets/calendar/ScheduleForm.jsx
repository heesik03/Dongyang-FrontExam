const ScheduleForm = ({onSubmit, currentDay, time, setTime, schedule, setSchedule}) => {
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <p style={{fontSize : "1.2em"}}>{`${currentDay.year}년 ${currentDay.month}월 ${currentDay.day}일`}</p>
            
            <label className="form-label"
                htmlFor="schedule-time" >
                시간
            </label>
            <input className="ms-4"
                type="time"
                id="schedule-time" 
                value={time}
                onChange={(e) => setTime(e.target.value)} required />
            <br />

            <label className="form-label"
                htmlFor="schedule">
                일정
            </label>
            <textarea className="ms-4"
                id="schedule" 
                rows="3" 
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)} required />
            <br />

            <button className="btn btn-outline-primary"
                type="submit">
                    제출
            </button>
        </form>
    )
}

export default ScheduleForm;