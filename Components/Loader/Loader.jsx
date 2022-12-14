import { Triangle } from "react-loader-spinner"
import { Modal } from "react-bootstrap"

import style from '../../styles/Loader.module.css'

const Loader = ({message}) =>{
    return (
        <Modal show={true} centered className={style.modalLoaderContent} >
            <div className="mt-2 mb-2 d-flex flex-column justify-content-center align-items-center ">
                <Triangle
                color="black"
                />
                <span className="fs-4">{message}</span>
            </div>
        </Modal>
    )
}

export default Loader