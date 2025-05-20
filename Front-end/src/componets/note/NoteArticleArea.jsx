const NoteArticleArea = ({title, timestamp, content}) => {
    return (
        <article>
            <p>제목 : {title} </p>
            <p>작성일 : {timestamp} </p>
            <p>{content}</p>
        </article>
    )
}

export default NoteArticleArea;