const NotePasswordArea = ({id, password, setPassword}) => {
    return (
        <>
            <label className="form-label" htmlFor={id}>
                메모 비밀번호
            </label>
            <input
                className="form-control-sm ms-2"
                type="password"
                id={id}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
        </>
    )
}

export default NotePasswordArea;