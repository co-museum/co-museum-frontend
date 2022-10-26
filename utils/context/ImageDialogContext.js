import {createContext} from "react";

const ImageDialogContext = createContext({
    showImage: ({images=[]}, onClose = (result) => {}) => {}
});

export default ImageDialogContext;