const ScheduleForm = ({onSubmit, currentDay, schedule, setSchedule}) => {

    const onChange = (e) => {
        setSchedule({
            ...schedule,
            [e.target.id]: e.target.value
        });        
    }

    const onChangeIsLocked = () => {
        setSchedule((schedule) => ({
            ...schedule,
            isImportant: !schedule.isImportant
        }));
    };

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <p style={{fontSize : "1.2em"}}>{`${currentDay.year}년 ${currentDay.month}월 ${currentDay.day}일`}</p>
            
            <label className="form-label"
                htmlFor="time" >
                시간
            </label>
            <input className="ms-4"
                type="time"
                id="time" 
                value={schedule.time}
                onChange={onChange} required />
            <br />

            <label className="form-label"
                htmlFor="description">
                일정
            </label>
            <textarea className="ms-4"
                id="description" 
                rows="3" 
                value={schedule.description}
                onChange={onChange} required />
            <br />

            <label className="form-label"
                htmlFor="important">
                중요도
            </label>
            <input className="form-check-input ms-3 border border-primary"
                type='checkbox'
                id="important"
                checked={schedule.isImportant}
                onChange={onChangeIsLocked} />
            <br />

            <button className="btn btn-outline-primary"
                type="submit">
                    제출
            </button>
        </form>
    )
}

export default ScheduleForm;