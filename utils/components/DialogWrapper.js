import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {useState} from "react";
import DialogContext from "../context/DialogContext";


export const DialogWrapper = ({children}) => {
    const [open, setOpen] = useState(false);
    const [hideClose, setHideClose] = useState(false);
    const [title, setTitle] = useState('');
    const [actions, setActions] = useState([]);
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [onCloseFunction, setOnClose] = useState()

    const [options, setOptions] = useState({});

    const handleClose = (...result) => {
        setOpen(false);
        if (onCloseFunction) {
            onCloseFunction(result);
        }
    }

    const initDialog = ({title= '', description= '', titleBoxClass= '', contentClass = '',titleClass = '', descriptionClass = '', dialogClass = '', actions = [], content = '', hideClose = false}, onClose = (result) => {}) =>{
        setTitle(title);
        setDescription(description);
        setOpen(true);
        setOnClose(onClose);
        setActions(actions);
        setContent(content);
        setHideClose(hideClose);
        setOptions(v => ({...v, titleClass, descriptionClass, dialogClass, titleBoxClass, contentClass}))
    }

    const value = {
        initDialog,
        close: handleClose
    }

    return (<DialogContext.Provider value={value}>
            <Dialog
                className={'dialog '+options.dialogClass}
                open={open}
                onClose={handleClose}>
                <DialogTitle className={'dialog-title-box ' + options.titleBoxClass}>
                    <div>
                        <p className={'dialog-description '+ options.descriptionClass}>{description}</p>
                        <p className={'dialog-title ' + options.titleClass}>{title}</p>
                    </div>

                    {!hideClose && <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}>
                        <img src="/images/close-black.svg" className={'image-40x40'}/>
                    </IconButton>
                    }
                </DialogTitle>
                <DialogContent className={'dialog-content ' + options.contentClass}>
                    <div className={'d-inline'}>
                        {content}
                        {actions}
                    </div>
                </DialogContent>
            </Dialog>
            {children}
        </DialogContext.Provider>
    );
}