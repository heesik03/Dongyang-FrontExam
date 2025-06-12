const ScheduleForm = ({onSubmit, currentDay, schedule, setSchedule}) => {

    const onChange = (e) => {
        setSchedule({
            ...schedule,
            [e.target.id]: e.target.value
        });        
    }

    const onChangeCheckbox = (e) => {
        setSchedule((schedule) => ({
            ...schedule,
            [e.target.id] : e.target.checked
        }));
    };
    
    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <p style={{fontWeight : "bold", fontSize : "1.2em", color : "#0093ff"}}>{`${currentDay.year}년 ${currentDay.month}월 ${currentDay.day}일`}</p>
            
            <label className="form-label"
                htmlFor="time" >
                시간
            </label>
            <input className="form-control border-primary"
                type="time"
                id="time" 
                value={schedule.time}
                onChange={onChange} required
                disabled={schedule.isBirthday} /> {/* 생일이면 기본값이 들어가기 때문에 disabled 활성화 */}
            <br />

            <label className="form-label"
                htmlFor="description">
                일정
            </label>
            <textarea className="form-control border-primary"
                id="description" 
                rows="3" 
                placeholder="일정을 작성하세요"
                value={schedule.description}
                onChange={onChange} required />
            <br />

            <label className="form-label"
                htmlFor="isImportant">
                중요도
            </label>
            <input className="form-check-input ms-3 border-primary"
                type='checkbox'
                id="isImportant"
                checked={schedule.isImportant}
                onChange={onChangeCheckbox}
                disabled={schedule.isBirthday} />  {/* 생일이면 기본값이 들어가기 때문에 disabled 활성화 */}
                
            <label className="form-label ms-4"
                htmlFor="isBirthday">
                생일
            </label>
            <input className="form-check-input ms-3 border-primary"
                type='checkbox'
                id="isBirthday"
                checked={schedule.isBirthday}
                onChange={onChangeCheckbox} />
            <br />

            <button className="btn btn-outline-primary"
                type="submit">
                    제출
            </button>
        </form>
    )
}

export default ScheduleForm;