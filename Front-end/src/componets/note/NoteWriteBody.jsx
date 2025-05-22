import NotePasswordArea from "./NotePasswordArea";

const NoteWriteBoday = ({onSubmit, title, setTitle, content, setContent, isLocked, setIsLocked, password, setPassword}) => {
    return (
        <form onSubmit={onSubmit}>
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
                    onChange={() => setIsLocked(isLocked => !isLocked)}
                />
                <label className="form-check-label" htmlFor="lock-switch">메모 잠금</label>
            </div>
            <br />
            {
                isLocked && <NotePasswordArea id={"note-password"} password={password} setPassword={setPassword} />
            }

            <button className="btn btn-primary" 
                type="submit" >
                제출
            </button>
        </form>
    );
}

export default NoteWriteBoday;