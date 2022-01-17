import styleClasses from "../../styles/ui/Card.module.css";

function Card(props) {
  return <div className={styleClasses.card}>{props.children}</div>;
}

export default Card;
