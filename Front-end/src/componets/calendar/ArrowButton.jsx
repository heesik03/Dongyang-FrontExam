const ArrowButton = ({arrow, onClick}) => {
    return (
        <button className="arrow-button px-2"
            type="button" 
            onClick={onClick}>
                {arrow}
        </button>
    )
}

export default ArrowButton;