import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const NoteArticleArea = ({title, timestamp, content, star, patch, id}) => {
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
            <Link to={`/note/update/${id}`}>
                <button className="btn btn-outline-primary"
                    type="button">
                    수정
                </button>
            </Link>
        </article>
    )
}

export default NoteArticleArea;