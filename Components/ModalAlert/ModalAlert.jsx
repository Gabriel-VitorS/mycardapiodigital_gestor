import { Modal } from "react-bootstrap"

const ModalAlert = ({message, onClick}) =>{
    return (
        <Modal show={true} >
            <Modal.Body className="border-0">

                <span className="fs-4">{message}</span>
            </Modal.Body>

            <Modal.Footer style={{border: '0'}}>
                <button onClick={onClick} className="btn btn-primary">Ok</button>
            </Modal.Footer>

        </Modal>
    )
}

export default ModalAlert