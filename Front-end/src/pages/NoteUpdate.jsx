import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useTitle from "../hooks/useTitle";
import NoteWriteBoday from "../componets/note/NoteWriteBody";

function NoteUpdate() {
    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [ password, setPassword ] = useState("");
    const [ isLocked, setIsLocked ] = useState(false);
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
                title,
                content,
                password : password==="" ? null : password,
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
            <h3>메모 수정</h3>
            <NoteWriteBoday onSubmit={(e) => updateNote(e)} 
                title={title} setTitle={setTitle}
                content={content} setContent={setContent}
                isLocked={isLocked} setIsLocked={setIsLocked}
                password={password} setPassword={setPassword} />
        </main>
    )
}

export default NoteUpdate;