import { useState } from "react";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        try {
            console.log(`email : ${email} password : ${password}`)
        } catch {
            alert("로그인 오류입니다");
        }
    }

    return (
        <main>
            <h1>로그인 페이지입니다.</h1>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="loginEmail">이메일</label>
                <input 
                    type="email" 
                    id="loginEmail" 
                    placeholder="이메일 입력" 
                    onChange={(e) => {setPassword(e.target.value)}}
                    required />
                <br />

                <label htmlFor="loginPassword">비밀번호</label>
                <input 
                    type="password" 
                    id="loginPassword" 
                    placeholder="비밀번호 입력" 
                    minLength={8} maxLength={30} 
                    onChange={(e) => {setEmail(e.target.value)}}
                    required />
                <br />

                <button type="submit">로그인</button>
            </form>
        </main>
    )
}

export default LogIn;