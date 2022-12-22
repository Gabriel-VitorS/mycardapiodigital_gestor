import { useState, useEffect, useRef } from "react"
import ReactCrop from "react-image-crop"
import 'react-image-crop/dist/ReactCrop.css'

import { Modal } from "react-bootstrap"
const CropImage =({referencia}) =>{
    
    const imageFile = useRef()
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState();
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null)

    const selectImage = (file) => {
        
        if(file){

            setCrop({
                unit: 'px',
                x: 25,
                y: 25,
                width: 50,
                height: 50,
            })

            setSrc(URL.createObjectURL(file));
        }
    };

    const cropImageNow = async () => {

        const canvas = document.createElement('canvas');

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
            
        // Converting to base64
        const base64Image = canvas.toDataURL('image/png');
        setOutput(base64Image);
        canvas.toBlob( (blob) => {
            const file = new File( [ blob ], "mycanvas.png" ,{ lastModified: new Date().getTime(), type: 'image/png' });
            const dT = new DataTransfer();
            dT.items.add( file );
            imageFile.current.files = dT.files;
          } );
        
        setSrc(null)
    };

    return(
        <>
            <div className="col-md-6 mt-3">
                <label className="form-label">Selecione a imagem do produto</label>
                <input className="form-control" accept="image/*" onChange={(e)=>{selectImage(e.target.files[0])}} type="file" id="formFile" />
            </div>

            <div className="col-md-6 mt-3">
                {src && (
                    <Modal show={true} >
                        <Modal.Body>
                        <div>
                            <ReactCrop keepSelection={true} aspect={4/4} crop={crop} onChange={setCrop}> 
                                <img src={src} onLoad={(e)=>setImage(e.target)} /> 
                            </ReactCrop>
                            <br />
                            
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <button onClick={()=> {setSrc(null)}} className='btn btn-secondary'>Cancelar</button>
                        <button onClick={cropImageNow} className='btn btn-primary'>Selecionar</button>
                        </Modal.Footer>
                    </Modal>
                   
                )}

                <div><img className="rounded" ref={referencia}  src={output} width={100} height={100} id='output' /></div>
                <input type="file" className="d-none" id="imageFile" ref={imageFile} />
            </div>
        </>
    )
}

export default CropImage