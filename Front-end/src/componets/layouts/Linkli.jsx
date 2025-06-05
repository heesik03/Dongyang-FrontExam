import { Link } from "react-router-dom";

const Linkli = ({link, label}) => {
    return (
        <Link to={link}> 
            <li className="fw-bold mx-4" style={{fontSize : "1.2em"}}>
                {label}
            </li>
        </Link>    
    );
}


export default Linkli;