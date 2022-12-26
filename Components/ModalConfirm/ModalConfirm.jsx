import { Modal } from "react-bootstrap"

const ModalConfirm = ({message, onClick, setConfirm}) => {
    return (
        <Modal show={true} >
            <Modal.Body className="border-0">

                <span className="fs-4">{message}</span>
            </Modal.Body>

            <Modal.Footer style={{border: '0'}}>
                <button onClick={()=> setConfirm(false)} className="btn btn-secondary">Não</button>
                <button onClick={onClick} className="btn btn-primary">Sim</button>
            </Modal.Footer>

        </Modal>
    )
}

export default ModalConfirm