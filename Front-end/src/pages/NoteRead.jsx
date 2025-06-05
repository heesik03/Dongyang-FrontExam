import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useTitle from "../hooks/useTitle";
import PageMainTitle from "../componets/PageMainTitle";
import NotePasswordCheckArea from "../componets/note/NotePasswordCheckArea";
import NoteArticleArea from "../componets/note/NoteArticleArea";

function NoteRead() {
    const [ note, setNote ] = useState([]);
    const [ notePassword , setNotePassword ] = useState("");
    const [ isPassword, setIsPassword ] = useState(false);
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
                isPassword ? ( // 비밀번호가 맞았는지 확인
                    <NoteArticleArea
                        title={note[0]?.title}
                        timestamp={note[0]?.timestamp}
                        content={note[0]?.content}
                        star={isStar}
                        patch={patchStar}
                        id={id}
                    />
                    ) : <NotePasswordCheckArea notePassword={notePassword} 
                            onChangePassword={onChangePassword}
                            lockPassword={note[0].password}
                            setIsPassword={setIsPassword} />
            ) : ( // 비밀번호가 존재하지 않을 시 그대로 출력
                <NoteArticleArea
                    title={note[0]?.title}
                    timestamp={note[0]?.timestamp}
                    content={note[0]?.content}
                    star={isStar}
                    patch={patchStar}
                    id={id}
                />
            )
        }
        </main>
    )
}

export default NoteRead;