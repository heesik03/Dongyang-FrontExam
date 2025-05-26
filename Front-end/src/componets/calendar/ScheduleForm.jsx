const ScheduleForm = ({onSubmit, currentDay, time, setTime, schedule, setSchedule}) => {
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <p>{`${currentDay.year}년 ${currentDay.month}월 ${currentDay.day}일`}</p>
            
            <label className="form-label"
                htmlFor="schedule-time">
                시간
            </label>
            <input className="ms-2"
                type="time"
                id="schedule-time" 
                value={time}
                onChange={(e) => setTime(e.target.value)} required />
            <br />

            <label className="form-label"
                htmlFor="schedule">
                일정
            </label>
            <textarea className="ms-2"
                id="schedule" 
                rows="3" 
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)} required />
            <br />

            <button className="btn btn-primary btn-sm"
                type="submit">
                    제출
            </button>
        </form>
    )
}

export default ScheduleForm;