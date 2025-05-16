import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import useTitle from "../hooks/useTitle";

function Note() {
    const [ noteList, setNoteList ] = useState([]);

    useTitle("김희식 기말 메모");

    const getNoteList = async() => { // npx json-server db.json
        try {
            const noteData = await axios.get('http://localhost:3000/notes');
            setNoteList(noteData.data.reverse())
        } catch (error) {
            console.error(`getNoteList Error : ${error}`);
            alert("사이트 오류로 메모 불러오기에 실패했습니다.");
        }
    }

    useEffect(() => {
        getNoteList();
    }, []);

    return (
        <main className="container">
            <h1>Note입니다.</h1>
            <br />
            <Link to="/note/write"> 
                <button>작성</button>
            </Link>   
            <br />
            <br />

            <section>
                <ul>
                {
                    noteList?.map(note => (
                        <li key={note.id} className="note-item">
                            <Link to={`/note/${note.id}`}>
                                <p>{note.title}</p>
                                <small>{note.timestamp}</small>
                            </Link>
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