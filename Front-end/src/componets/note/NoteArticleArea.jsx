import 'bootstrap-icons/font/bootstrap-icons.css';

const NoteArticleArea = ({title, timestamp, content, star, patch}) => {
    const buttonClassName = "btn btn-outline-warning btn-lg ms-auto";

    return (
        <article>
            <div className="d-flex">
                <h3 style={{fontWeight : "bold"}}>{title}</h3>
                <button className={`${star ? "bi bi-star-fill" : "bi bi-star"} ${buttonClassName}`}
                    type="button" 
                    style={{color : "gold"}}
                    onClick={patch} />
            </div>
            <p>{timestamp} </p>
            <hr />
            <p id="read-content">{content}</p>
            <hr />
        </article>
    )
}

export default NoteArticleArea;