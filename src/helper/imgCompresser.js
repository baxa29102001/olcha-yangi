//imports
import Compressor from 'compressorjs';
//document
const imgInput = document.getElementById('img');

//FUNCTION
let file = {};
export function setFile() {
  let imgOptima = imgInput.files[0];
  new Compressor(imgOptima, {
    quality: 0.6,
    width: 200,
    height: 200,

    success(result) {
      file = result;
    },
  });
  return file;
}

//listener
imgInput.addEventListener('change', setFile);
