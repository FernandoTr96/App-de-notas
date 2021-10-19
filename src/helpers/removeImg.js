import Swal from 'sweetalert2'
import {SHA1} from 'crypto-js'

export const removeImg = async (public_id) => {

    const cloudinaryApi = `${process.env.REACT_APP_CDY_BASE_URL}/image/destroy`;

    const timestamp = Math.round((new Date()).getTime() / 1000);

    //coinstruir el string que se encriptara usando los parametros del endpoint
    const signatureStr = `public_id=${public_id}&timestamp=${timestamp}${process.env.REACT_APP_CDY_API_SECRET}`;
    const signature = SHA1(signatureStr);

    //enviar al cuerpo dela peticion cada dato necesario 
    const formData = new FormData();
    formData.append('public_id', public_id);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);
    formData.append('api_key', process.env.REACT_APP_CDY_API_KEY);


    try {

        const response = await fetch(cloudinaryApi, {
            method: 'POST',
            body: formData
        });

        response.ok ? await response.json() : response.reject();

    } catch (error) {
        Swal.fire({
            title: 'i cant delete image',
            text: error,
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }
}