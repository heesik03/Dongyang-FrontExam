import { Link } from "react-router-dom";

const NoteItem = ({note, deleteNote}) => {
    return (
        <li className={`${note.star  ? "note-item-star" : "note-item"} pt-2`}>
            <Link to={`/note/${note.id}`}>
                <p style={{color : note.star ? "#FFD700" : "black", fontWeight: note.star ? "bold" : "normal" }}>
                {note.password && "🔒"} 
                
                {note.title.length > 15 ? ( // 제목이 16자 이상이라면 
                    <>
                        {note.title.slice(0, 14)}
                        <span style={{ fontSize: "1.5em", fontWeight: "bold" }}> · · · </span>
                    </>
                ) : note.title}
                </p>
                <small>{note.timestamp}</small>
            </Link>
            <button className="btn btn-outline-danger btn-sm ms-2"
                type="button" 
                onClick={() => deleteNote(note.id)} >
                X
            </button>
            <hr className="mb-0" />
        </li>
    );
}

export default NoteItem;