import { useState } from "react";
import NotePasswordArea from "./NotePasswordArea";

const NotePasswordCheckArea = ({notePassword, onChangePassword, lockPassword, setIsPassword}) => {
    const [ isPasswordValid, setIsPasswordValid ] = useState(false);

    const checkPassword = (e) => {
        e.preventDefault();
        notePassword === lockPassword ? setIsPassword(true) : setIsPasswordValid(true);
    }
    return (
        <form>
            <NotePasswordArea id={"check-password"} password={notePassword} onChange={onChangePassword} />
            <button className="btn btn-outline-info"
                type="submit" 
                onClick={(e) => checkPassword(e)}>
                    확인
            </button>
            <p className="fw-bold text-danger mt-2">
            {
                isPasswordValid ? "비밀번호가 틀렸습니다." : "\u00A0" // 여백
            }
            </p>
        </form>
    );
}

export default NotePasswordCheckArea;