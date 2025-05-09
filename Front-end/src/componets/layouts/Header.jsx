import Linkli from "../LinkLi"

const Header = () => {
    const headerList = [
        {
            link : "/",
            label : "홈",
        },
        {
            link : "/note",
            label : "메모",
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