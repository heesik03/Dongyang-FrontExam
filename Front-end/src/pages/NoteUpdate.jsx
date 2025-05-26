import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useTitle from "../hooks/useTitle";
import PageMainTitle from "../componets/PageMainTitle";
import NoteWriteBody from "../componets/note/NoteWriteBody";

function NoteUpdate() {
    const [noteData, setNoteData] = useState({
        title: "",
        content: "",
        password: "",
        isLocked: false
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const koreaTime = new Date().toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
    })

    useTitle("김희식 기말 메모 수정");

    const updateNote = async(e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/notes/${id}`, {
                id,
                title : noteData.title,
                content : noteData.content,
                password : noteData.password==="" ? null : noteData.password,
                timestamp : koreaTime
            })
            alert("메모 수정에 성공했습니다!");
            navigate("/note");
        } catch (error) {
            console.error(`onSubmitNote Error : ${error}`);
            return alert("사이트 오류로 메모 수정에 실패했습니다.");
        }
    }

    return (
        <main className="container">
            <PageMainTitle title={"메모 수정"} />
            <NoteWriteBody onSubmit={(e) => updateNote(e)} 
                noteData={noteData}
                setNoteData={setNoteData} />
        </main>
    )
}

export default NoteUpdate;