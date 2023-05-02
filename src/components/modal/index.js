import StyleItem from "../../css/Modal.module.css";
import cross from "../../img/close.png";

function Modal(props) {
  if (!props.isOpen) return false;

  function clickModal(event) {
    event.stopPropagation();
  }
  return (
    <div className={StyleItem.background} onClick={() => props.close(false)}>
      <div className={StyleItem.modal} onClick={clickModal}>
        <div className={StyleItem.modal__title}>
          {props.children.title}
          <span
            className={StyleItem.modal__btn}
            onClick={() => props.close(false)}
          >
            <img src={cross} alt="" />
          </span>
        </div>
        <div className={StyleItem.modal__body}>{props.children.body}</div>
      </div>
    </div>
  );
}
export default Modal;
