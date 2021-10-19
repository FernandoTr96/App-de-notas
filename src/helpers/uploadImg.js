import {SHA1} from 'crypto-js'
import Swal from 'sweetalert2'

export const uploadImg = async (file) => {

    const cloudinaryApi = `${process.env.REACT_APP_CDY_BASE_URL}/image/upload`;

    const timestamp = Math.round((new Date()).getTime() / 1000);
    const signatureStr = `timestamp=${timestamp}${process.env.REACT_APP_CDY_API_SECRET}`;
    const signature = SHA1(signatureStr);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('api_key', process.env.REACT_APP_CDY_API_KEY);

    try {

        const response = await fetch(cloudinaryApi, {
            method: 'POST',
            body: formData
        });

        const data = response.ok ? await response.json() : response.reject();

        return data;
        

    } catch (error) {

        Swal.fire({
            title: 'image upload error',
            text: error,
            icon: 'error',
            confirmButtonText: 'ok'
        })

        return null
    }
}