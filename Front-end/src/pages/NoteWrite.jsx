import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NoteWrite() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate();

    const onSubmitNote = () => {
        setTitle("")
        setContent("")
        navigate("/note")
    }

    return (
        <main class="container">
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