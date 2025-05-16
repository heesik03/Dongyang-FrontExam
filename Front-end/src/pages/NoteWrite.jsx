import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useTitle from "../hooks/useTitle";

function NoteWrite() {
    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const navigate = useNavigate();
    const koreaTime = new Date().toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
    })

    useTitle("김희식 기말 메모 작성");

    const onSubmitNote = async() => {
        try {
            await axios.post('http://localhost:3000/notes', {
            title : title,
            content : content,
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
            <label className="form-label"
                htmlFor="note-title">   
                제목
            </label>
            <input className="form-control" 
                type="text"
                id="note-title"
                value={title}
                onChange={(e) => {setTitle(e.target.value)}} />
            <br />

            <label className="form-label"
                htmlFor="note-content">
                내용
            </label>
            <textarea className="form-control"
                id="note-content"
                rows="10" 
                value={content}
                onChange={(e) => {setContent(e.target.value)}} />
            <br />

            <button type="submit" onClick={onSubmitNote}>제출</button>
        </main>
    )
}

export default NoteWrite;