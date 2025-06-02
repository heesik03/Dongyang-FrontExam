import { useRef, useEffect } from "react";
import NotePasswordArea from "./NotePasswordArea";

const NoteWriteForm = ({onSubmit, noteData, setNoteData }) => {
    const inputRef = useRef(null); // 제목 focus
    const textareaRef = useRef(null); // 내용 focus

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onChange = (e) => {
        setNoteData({
            ...noteData,
            [e.target.id]: e.target.value
        });        
    }

    const onKeyDownEnter = (e) => {
        if(e.key === "Enter") {
            e.preventDefault(); // 줄바꿈 방지
            textareaRef.current.focus();
        }
    }

    const onChangeIsLocked = () => {
        setNoteData((noteData) => ({
            ...noteData,
            isLocked: !noteData.isLocked
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <label className="form-label"
                htmlFor="title">   
                제목
            </label>
            <input className="form-control" 
                ref={inputRef}
                type="text"
                id="title"
                value={noteData.title}
                onChange={onChange} 
                onKeyDown={onKeyDownEnter} required />
            <br />

            <label className="form-label"
                htmlFor="content">
                내용
            </label>
            <textarea className="form-control"
                ref={textareaRef}
                id="content"
                rows="10" 
                value={noteData.content}
                onChange={onChange} required />
            <br />

            <div className="form-check form-switch">
                <input className="form-check-input" 
                    type="checkbox" 
                    id="lock-switch" 
                    onChange={onChangeIsLocked} 
                />
                <label className="form-check-label" htmlFor="lock-switch">메모 잠금</label>
            </div>
            <br />
            {
                noteData.isLocked && <NotePasswordArea id={"password"} password={noteData.password} onChange={onChange} />
            }

            <button className="btn btn-primary" 
                type="submit" >
                제출
            </button>
        </form>
    );
}

export default NoteWriteForm;