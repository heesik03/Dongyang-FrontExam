import Linkli from "../LinkLi"

const Header = () => {
    const headerList = [
        {
            link : "/",
            label : "홈",
        },
        {
            link : "/login",
            label : "로그인",
        },
        {
            link : "/mypage",
            label : "마이페이지",
        },
        {
            link : "/signup",
            label : "회원가입",
        },
    ]

    return (
        <header>
            <ul>
            {
                headerList.map( list => (
                    <Linkli key={list.label} link={list.link} label={list.label} />
                ))
            }
            </ul>
            <br />
            <hr />
        </header>
    )
}

export default Header;