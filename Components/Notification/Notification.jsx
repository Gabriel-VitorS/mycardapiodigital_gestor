import { Toast, ToastContainer } from "react-bootstrap"

const Notification = ({type, text, visible, setToast}) => {
    return (
        <ToastContainer position="top-end" className="mt-1 me-1">
        <Toast show={visible} animation={true} delay={4000} onClose={()=>setToast(false)} autohide bg={type} >
            <Toast.Body className="text-white" >
                {text}
            </Toast.Body>
        </Toast>
        </ToastContainer>
    )
}

export default Notification