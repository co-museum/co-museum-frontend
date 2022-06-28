import {createContext} from "react";

const ImageDialogContext = createContext({
    showImage: ({url=''}, onClose = (result) => {}) => {}
});

export default ImageDialogContext;