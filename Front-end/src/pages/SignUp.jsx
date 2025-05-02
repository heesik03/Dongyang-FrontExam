import { useState, useEffect } from "react";
import ValidationMessage from "../componets/ValidationMessage";

function SignUp() {
    const [signUpInfo, setSignUpInfo] = useState({ // 회원가입 정보
        name : "",
        email : "",
        password : ""
    });
    const [pwdValid, setPwdValid] = useState({ // 비밀번호 조건 체크 함수
        hasRequiredChars : false,
        iterationChars : false,
        isLength : false
    });
    const [checkPassword, setCheckPassword] = useState(""); 

    useEffect(() => {
        setPwdValid({
            hasRequiredChars: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/.test(signUpInfo.password), // 영문자, 특수문자, 숫자 확인
            iterationChars: !/(.)\1{2,}/.test(signUpInfo.password), // 3회 이상 반복여부 확인
            isLength: /^.{8,30}$/.test(signUpInfo.password), // 길이 조건 확인
        });
    }, [signUpInfo.password]); 

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const { hasRequiredChars, iterationChars, isLength } = pwdValid;
        if (!(hasRequiredChars && iterationChars && isLength)) { // 비밀번호 조건이 모두 만족하지 않을 시
            return alert("비밀번호가 보안 조건을 충족하지 않습니다.");
        }

        if (signUpInfo.password!==checkPassword)
            return alert("비밀번호와 확인용 비밀번호가 다릅니다.");
        try {
            console.log(`name : ${signUpInfo.name} email : ${signUpInfo.email} password : ${signUpInfo.password}`);
        } catch {
            alert("회원가입 오류입니다.");
        }
    }

    const onChangeSignUpInfo = (e) => {
        setSignUpInfo({
            ...signUpInfo,
            [e.target.id] : e.target.value,
        })
    }

    return (
        <main>
            <h1>회원가입 페이지입니다.</h1>
            <form onSubmit={handleSignUpSubmit}>
                <label htmlFor="name">이름</label>
                <input 
                    type="text" 
                    id="name" 
                    placeholder="이름 입력" 
                    maxLength={30} 
                    value={signUpInfo.name}
                    onChange={onChangeSignUpInfo}
                    required />
                <br />

                <label htmlFor="email">이메일</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="이메일 입력" 
                    value={signUpInfo.email}
                    onChange={onChangeSignUpInfo}
                    required />
                <br />

                <label htmlFor="password">비밀번호</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="비밀번호 입력" 
                    value={signUpInfo.password}
                    onChange={onChangeSignUpInfo}
                    required />
                <ValidationMessage isValid={pwdValid.hasRequiredChars} message="영문자, 특수문자, 숫자가 포함되어야 합니다." />
                <ValidationMessage isValid={pwdValid.iterationChars} message="같은 문자가 3회 이상 반복되면 안됩니다." />
                <ValidationMessage isValid={pwdValid.isLength} message="비밀번호 길이는 최소 8자, 최대 30자입니다." />
                <br />

                <label htmlFor="checkPassword">확인 비밀번호</label>
                <input 
                    type="password" 
                    id="checkPassword" 
                    placeholder="확인 비밀번호 입력" 
                    onChange={(e) => {setCheckPassword(e.target.value)}}
                    required />
                <br />

                <button type="submit">회원가입</button>
            </form>
        </main>
    )
}

export default SignUp;