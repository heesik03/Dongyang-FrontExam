import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useTitle from "../hooks/useTitle";
import NotePasswordArea from "../componets/note/NotePasswordArea";
import NoteArticleArea from "../componets/note/NoteArticleArea";

function NoteRead() {
    const [ note, setNote ] = useState([]);
    const [ notePassword , setNotePassword ] = useState("");
    const { id } = useParams();

    useTitle(`김희식 기말 메모 읽기`);

    const onChangePassword = (e) => {
        setNotePassword(e.target.value);
    }

    const getNote = async() => {
        try {
            const responseData = await axios.get(`http://localhost:3000/notes?id=${id}`);
            setNote(responseData.data);
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
                    ) : <NotePasswordArea id={"check-password"} password={notePassword} onChange={onChangePassword} />
            ) : (
                <NoteArticleArea
                    title={note[0]?.title}
                    timestamp={note[0]?.timestamp}
                    content={note[0]?.content}
                />
            )
        }
            <Link to={`/note/update/${id}`}>
                <button className="btn btn-outline-primary btn-sm"
                    type="button">
                    수정
                </button>
            </Link>
        </main>
    )
}

export default NoteRead;