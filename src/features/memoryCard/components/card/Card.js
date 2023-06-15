import "./card.css";

const Card = (props) => {
    return (
        <div className="card" onClick={() => { props.callback(...props.value);}}>
            {props.value}
        </div>
    )
}

export default Card;