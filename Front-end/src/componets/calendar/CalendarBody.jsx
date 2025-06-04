const CalendarBody = ({ firstWeek, lastDay, currentDay, setCurrentDay }) => {
    const totalCells = lastDay + firstWeek; 
    const rows = []; // 달력의 열
    let cells = []; 

    for (let i = 0; i < totalCells; i++) {
        let color = 'black';
        const day = i + 1 - firstWeek; // 날짜 계산

        if (i < firstWeek) {
            cells.push(<td key={`empty-${i}`}>&nbsp;</td>); // 빈 칸
        } else {
            if (i % 7 === 0) {
                color = 'red'; 
            } else if (i % 7 === 6) {
                color = 'blue';
            }

            cells.push(
                <td
                    key={`${day}일`}
                    onClick={() => setCurrentDay({ ...currentDay, day })}
                    style={{ color }}
                    className="calendar-item"
                    id={currentDay.day === day ? "click-item" : null} // 클릭 시에만 스타일 적용
                >
                    {day}
                </td>
            );
        }

        if ((i + 1) % 7 === 0) { // 7일 단위로 rows 배열에
            rows.push(<tr key={`${i}줄`}>{cells}</tr>);
            cells = [];
        }
    }

    if (cells.length > 0) { // 마지막 주가 7일로 맞아떨어지지 않을 때
        rows.push(<tr key="마지막 줄">{cells}</tr>);
    }

    return <tbody>{rows}</tbody>;
};

export default CalendarBody;
