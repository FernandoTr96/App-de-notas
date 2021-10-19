import cloudinary from 'cloudinary'
import { uploadImg } from '../../helpers/uploadImg';

cloudinary.v2.config({ 
    cloud_name: process.env.REACT_APP_CDY_CLOUDNAME, 
    api_key: process.env.REACT_APP_CDY_API_KEY, 
    api_secret: process.env.REACT_APP_CDY_API_SECRET,
    secure: true
});

describe('Pruebas en el helper uploadImg.js', () => {

    test('debe subir la imagen correctamente', async () => {
        
        const resp = await fetch('https://cdn-icons-png.flaticon.com/512/197/197397.png');
        const blob = await resp.blob();
        const file = new File([blob],'foto.png');

        const {url, public_id} =  await uploadImg(file);

        expect(typeof url).toBe('string');

        await cloudinary.v2.api.delete_resources(public_id, {});

    });

});