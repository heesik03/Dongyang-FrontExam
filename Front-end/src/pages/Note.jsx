import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import useTitle from "../hooks/useTitle";
import PageMainTitle from "../componets/PageMainTitle";
import NoteItem from "../componets/note/NoteItem";

function Note() {
    const [ originNoteList, setOriginNoteList ] = useState([]);
    const [ noteList, setNoteList ] = useState([]);
    const [ showMore, setShowMore ] = useState(false);

    useTitle("김희식 기말 메모");
    
    const toDate = s => { // Date 형식 변경
        const [y, m, d, ap, h, mi, sec] = s.match(/\d+|오전|오후/g);  // 순서대로: 연, 월, 일, 오전/오후, 시, 분, 초
        let hour = +h;
        if (ap === '오후' && hour < 12) 
            hour += 12;
        if (ap === '오전' && hour === 12) 
            hour = 0;
        return new Date(+y, m - 1, +d, hour, +mi, +sec);
    };

    const sortNoteList = (e) => {    
        const value = e.target.value;

        if (showMore) { // 더보기 버튼이 눌린 경우, 다시 false로 바꾸어 더보기 버튼 생성
            setShowMore((show) => !show)
        }

        if (value === 'earliest') { // 오래된 순
            setNoteList([...originNoteList].sort((a, b) => toDate(a.timestamp) - toDate(b.timestamp)));
        } else if (value === 'starred') { // 별표만
            setNoteList([...originNoteList].filter(note => 
                note.star===true
            ));
        } else if (value === 'locked') { // 잠금만
            setNoteList([...originNoteList].filter(note => 
                note.password!==null
            ));            
        } else { // 최신순 혹은 다른 value가 들어왔을때
            setNoteList([...originNoteList].sort((a, b) => toDate(b.timestamp) - toDate(a.timestamp)));
        }
    }

    const getNoteList = async() => { // npx json-server db.json
        try {
            const responseListData = await axios.get('http://localhost:3000/notes');
            setOriginNoteList([...responseListData.data].sort((a, b) => toDate(b.timestamp) - toDate(a.timestamp))) // 바뀌지 않는 원본 생성
            setNoteList([...responseListData.data].sort((a, b) => toDate(b.timestamp) - toDate(a.timestamp))) 
        } catch (error) {
            console.error(`getNoteList Error : ${error}`);
            alert("사이트 오류로 메모 불러오기에 실패했습니다.");
        }
    }

    const deleteNote = async(id) => {
        try {
            await axios.delete(`http://localhost:3000/notes/${id}`);
            setOriginNoteList(originNoteList.filter(note => note.id !== id));
            setNoteList(originNoteList.filter(note => note.id !== id));
        } catch (error) {
            console.error(`deleteNote Error : ${error}`);
            alert("사이트 오류로 노트 삭제에 실패했습니다.");
        }
    }

    useEffect(() => {
        getNoteList();
    }, []);

    return (
        <main className="container">
            <PageMainTitle title={"노트"} />

            <div className="d-flex">
                <Link to="/note/write"> 
                    <button className="btn btn-primary">작성</button>
                </Link>   
                <select className="ms-auto" onChange={sortNoteList}>
                    <option value="latest">최신순</option>
                    <option value="earliest">오래된 순</option>
                    <option value="starred">별표만</option>
                    <option value="locked">잠금만</option>
                </select>
            </div>
            <br />

            <section>
                <ul>
                {
                    // noteList가 5 이상이거나 더보기 버튼을 누르지 않은 경우 0~4번째 배열까지 보여줌
                    (noteList?.length >= 5 && !showMore ? noteList.slice(0, 5) : noteList).map(note => (
                        <NoteItem key={note.id} note={note} deleteNote={deleteNote} />
                    ))
                }
                {
                    !showMore && noteList?.length > 5 &&
                        <li className="text-center mt-2">
                            <button className="show-button p-2" 
                                style={{fontSize : "1.4em"}}
                                onClick={() => setShowMore((show) => !show)} >
                                더보기
                            </button>
                        </li>
                }
                </ul>
            </section>
        </main>
    )
}

export default Note;