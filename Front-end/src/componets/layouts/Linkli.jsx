import { Link } from "react-router-dom";

const Linkli = ({link, label}) => {
    return (
        <Link to={link}> 
            <li className="mx-4" style={{fontWeight : "bold"}}>
                {label}
            </li>
        </Link>    
    );
}


export default Linkli;