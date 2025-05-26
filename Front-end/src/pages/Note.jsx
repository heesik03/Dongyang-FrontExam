import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import useTitle from "../hooks/useTitle";
import PageMainTitle from "../componets/PageMainTitle";

function Note() {
    const [ noteList, setNoteList ] = useState([]);

    useTitle("김희식 기말 메모");

    const getNoteList = async() => { // npx json-server db.json
        try {
            const responseListData = await axios.get('http://localhost:3000/notes');
            setNoteList(responseListData.data.reverse())
        } catch (error) {
            console.error(`getNoteList Error : ${error}`);
            alert("사이트 오류로 메모 불러오기에 실패했습니다.");
        }
    }

    const deleteNote = async(id) => {
        try {
            await axios.delete(`http://localhost:3000/notes/${id}`);
            setNoteList(noteList.filter(note => note.id !== id));
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

            <Link to="/note/write"> 
                <button className="btn btn-primary">작성</button>
            </Link>   
            <br />
            <br />

            <section>
                <ul>
                {
                    noteList?.map(note => (
                        <li key={note.id} className="note-item">
                            <Link to={`/note/${note.id}`}>
                                <p>
                                {note.password && "🔒"} 
                                
                                {note.title.length > 15 ? ( // 제목이 16자 이상이라면 
                                    <>
                                        {note.title.slice(0, 14)}
                                        <span style={{ fontSize: "1.5em", fontWeight: "bold" }}> · · · </span>
                                    </>
                                ) : note.title}
                                </p>
                                <small>{note.timestamp}</small>
                            </Link>
                            <button className="btn btn-outline-danger btn-sm ms-2"
                                type="button" 
                                onClick={() => deleteNote(note.id)} >
                                X
                            </button>
                            <hr />
                        </li>
                    ))
                }
                </ul>
            </section>
        </main>
    )
}

export default Note;