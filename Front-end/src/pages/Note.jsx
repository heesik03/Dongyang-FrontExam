import { Link } from "react-router-dom";

function Note() {
    return (
        <main>
            <h1>Note입니다.</h1>
            <Link to="/note/write"> 
                <button>작성</button>
            </Link>   
        </main>
    )
}

export default Note;