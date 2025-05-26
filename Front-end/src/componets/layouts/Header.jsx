import Linkli from "./Linkli"

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
            <nav className="navbar justify-content-center mt-3">
                <ul className="list-unstyled d-flex">
                {
                    headerList.map( list => (
                        <Linkli key={list.label} link={list.link} label={list.label} />
                    ))
                }
                </ul>
            </nav>
            <hr />
        </header>
    )
}

export default Header;