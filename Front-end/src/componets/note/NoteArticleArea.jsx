const NoteArticleArea = ({title, timestamp, content}) => {
    return (
        <article>
            <h3 style={{fontWeight : "bold"}}>{title}</h3>
            <p>{timestamp} </p>
            <hr />
            <p id="read-content">{content}</p>
            <hr />
        </article>
    )
}

export default NoteArticleArea;