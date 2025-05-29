import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useTitle from "../hooks/useTitle";
import PageMainTitle from "../componets/PageMainTitle";
import NotePasswordArea from "../componets/note/NotePasswordArea";
import NoteArticleArea from "../componets/note/NoteArticleArea";

function NoteRead() {
    const [ note, setNote ] = useState([]);
    const [ notePassword , setNotePassword ] = useState("");
    const [ isStar, setIsStar ] = useState(note[0]?.star);
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

    const patchStar = async() => {
        try {
            await axios.patch(`http://localhost:3000/notes/${id}`, {
                star : !isStar
            })
            setIsStar(isStar => !isStar);  // UI 업데이트
        } catch (error) {
            console.error(`patchStar Error : ${error}`);
            return alert("사이트 별표 수정에 실패했습니다.");
        }
    }

    useEffect(() => {
        getNote();
    }, [])

    useEffect(() => {
        if (note[0]?.star !== undefined) {
            setIsStar(note[0].star);
        }
    }, [note]);

    return (
        <main className="container">
            <PageMainTitle title={"메모 읽기"} />
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
                    star={isStar}
                    patch={patchStar}
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