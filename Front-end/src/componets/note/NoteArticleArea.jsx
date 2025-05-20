const NoteArticleArea = ({title, timestamp, content}) => {
    return (
        <section>
            <p>제목 : {title} </p>
            <p>작성일 : {timestamp} </p>
            <p>{content}</p>
        </section>
    )
}

export default NoteArticleArea;