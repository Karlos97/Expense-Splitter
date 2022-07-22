import ReactDOM from 'react-dom'
import classes from './Modal.module.css'
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />
}

const portalElement = document.getElementById('overlay')

const Summary = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.contents}>{props.children}</div>

    </div>
  )
}

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}

      {ReactDOM.createPortal(
        <Summary>{props.children}</Summary>,
        portalElement
      )}

    </>
  )
}
export default Modal
