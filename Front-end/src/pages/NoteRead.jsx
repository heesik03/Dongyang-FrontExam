import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useTitle from "../hooks/useTitle";
import NotePasswordArea from "../componets/note/NotePasswordArea";
import NoteArticleArea from "../componets/note/NoteArticleArea";

function NoteRead() {
    const [ note, setNote ] = useState([]);
    const [ notePassword , setNotePassword ] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useTitle(`김희식 기말 메모 읽기`);

    const getNote = async() => {
        try {
            const noteData = await axios.get(`http://localhost:3000/notes?id=${id}`);
            setNote(noteData.data);
        } catch (error) {
            console.error(`getNote Error : ${error}`);
            alert("사이트 오류로 메모 불러오기에 실패했습니다.");
        }
    }

    useEffect(() => {
        getNote();
    }, [])

    return (
        <main className="container">
        {
            note[0]?.password ? ( // 비밀번호가 존재할 경우
                note[0].password === notePassword ? ( // 비밀번호 체크
                    <NoteArticleArea
                        title={note[0]?.title}
                        timestamp={note[0]?.timestamp}
                        content={note[0]?.content}
                    />
                    ) : <NotePasswordArea id={"check-password"} password={notePassword} setPassword={setNotePassword} />
            ) : (
                <NoteArticleArea
                    title={note[0]?.title}
                    timestamp={note[0]?.timestamp}
                    content={note[0]?.content}
                />
            )
        }

        </main>
    )
}

export default NoteRead;