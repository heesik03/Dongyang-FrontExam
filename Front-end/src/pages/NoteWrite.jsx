import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useTitle from "../hooks/useTitle";
import NotePasswordArea from "../componets/note/NotePasswordArea";

function NoteWrite() {
    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")
    const [ password, setPassword ] = useState("");
    const [ isLocked, setIsLocked ] = useState(false);
    const navigate = useNavigate();
    const koreaTime = new Date().toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
    })

    useTitle("김희식 기말 메모 작성");

    const onSubmitNote = async() => {
        try {
            await axios.post('http://localhost:3000/notes', {
                title,
                content,
                password : password==="" ? null : password,
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

            <div className="form-check form-switch">
                <input className="form-check-input" 
                    type="checkbox" 
                    id="lock-switch" 
                    onChange={() => setIsLocked(isLock => !isLock)}
                />
                <label className="form-check-label" htmlFor="lock-switch">메모 잠금</label>
            </div>
            <br />
            {
                isLocked && <NotePasswordArea id={"note-password"} password={password} setPassword={setPassword} />
            }

            <button className="btn btn-primary" 
                type="submit" 
                onClick={onSubmitNote} >
                제출
            </button>
        </main>
    )
}

export default NoteWrite;