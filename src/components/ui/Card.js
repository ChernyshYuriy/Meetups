import StyleElements from "../../css/Card.module.css";

function Card(props) {
  return <div className={StyleElements.card}>{props.children}</div>;
}

export default Card;
