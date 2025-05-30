import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useTitle from "../hooks/useTitle";
import PageMainTitle from "../componets/PageMainTitle";
import NoteWriteForm from "../componets/note/NoteWriteForm";

function NoteWrite() {
    const [noteData, setNoteData] = useState({
        title: "",
        content: "",
        password: "",
        isLocked: false
    });
    const navigate = useNavigate();
    const koreaTime = new Date().toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
    })

    useTitle("김희식 기말 메모 작성");

    const onSubmitNote = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/notes', {
                title : noteData.title,
                content : noteData.content,
                password : noteData.password==="" ? null : noteData.password,
                star : false,
                timestamp : koreaTime
            })
            alert("메모 작성에 성공했습니다!");
            navigate("/note");
        } catch (error) {
            console.error(`onSubmitNote Error : ${error}`);
            return alert("사이트 오류로 메모 작성에 실패했습니다.");
        }
    }

    return (
        <main className="container">
            <PageMainTitle title={"메모 작성"} />
            <NoteWriteForm onSubmit={(e) => onSubmitNote(e)} 
                noteData={noteData}
                setNoteData={setNoteData} />
        </main>
    )
}

export default NoteWrite;