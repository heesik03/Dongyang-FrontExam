const NoteArticleArea = ({title, timestamp, content, star, patch}) => {
    return (
        <article>
            <div className="d-flex">
                <h3 style={{fontWeight : "bold"}}>{title}</h3>
                <button className="btn btn-outline-warning btn-lg ms-auto"
                    type="button" 
                    onClick={patch} >
                    {star ? "⭐" : "☆"}
                </button>
            </div>
            <p>{timestamp} </p>
            <hr />
            <p id="read-content">{content}</p>
            <hr />
        </article>
    )
}

export default NoteArticleArea;