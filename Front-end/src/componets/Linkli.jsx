import { Link } from "react-router-dom";

const Linkli = ({link, label}) => {
    return (
        <Link to={link}> 
            <li className="header-item">
                {label}
            </li>
        </Link>    
    );
}


export default Linkli;