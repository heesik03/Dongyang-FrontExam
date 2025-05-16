import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useTitle from "../hooks/useTitle";

function NoteRead() {
    const [ note, setNote ] = useState([]);
    const { id } = useParams();

    useTitle(`김희식 기말 메모 읽기`);

    const getNote = async() => {
        try {
            const noteData = await axios.get(`http://localhost:3000/notes?id=${id}`);
            console.log(noteData.data);
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
        <main>
            <p>제목 : {note[0]?.title} </p>
            <p>작성일 : {note[0]?.timestamp} </p>
            <p>{note[0]?.content}</p>
        </main>
    )
}

export default NoteRead;