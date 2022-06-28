import {createContext} from "react";

const DialogContext = createContext({
    initDialog: ({title= '', description= '', titleClass = '', descriptionClass = '', dialogClass = '',  titleBoxClass= '', contentClass = '', actions = [], content = '', hideClose = false}, onClose = (result) => {}) => {},
    close: () => {}
});

export default DialogContext;