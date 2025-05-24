const NotePasswordArea = ({id, password, onChange}) => {
    return (
        <>
            <label className="form-label" htmlFor={id}>
                메모 비밀번호
            </label>
            <input
                className="form-control-sm ms-2"
                type="password"
                id={id}
                name={"password"}
                value={password}
                onChange={onChange}
            />
            <br />
        </>
    )
}

export default NotePasswordArea;