import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {useState} from "react";
import ImageDialogContext from "../context/ImageDialogContext";


export const ImageDialog = ({children}) => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(false);

    const handleClose = (...result) => {
        setOpen(false);
    }

    const showImage = ({url}, onClose = (result) => {}) =>{
        setOpen(true);
        setUrl(url)
    }

    const value = {
        showImage
    }

    return (<ImageDialogContext.Provider value={value}>
            <Dialog
                className={'dialog-image '}
                open={open}
                onClose={handleClose}>
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        className={'font-black'}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8
                        }}
                    >
                        <img src="/images/close-black.svg" className={'image-40x40'}/>
                    </IconButton>
                </DialogTitle>
                <DialogContent className={'dialog-content '}>
                    <img src={url} className={'image-container'}/>
                </DialogContent>
            </Dialog>
            {children}
        </ImageDialogContext.Provider>
    );
}