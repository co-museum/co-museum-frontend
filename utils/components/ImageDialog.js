import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {useState} from "react";
import ImageDialogContext from "../context/ImageDialogContext";

import dynamic from "next/dynamic";

const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export const ImageDialog = ({children}) => {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);

    const handleClose = (...result) => {
        setOpen(false);
    }

    const showImage = ({images = []}, onClose = (result) => {}) =>{
        setOpen(true);
        setImages(images)
        console.log(images)
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
                            top: 8,
                            zIndex: 99999
                        }}
                    >
                        <img src="/images/close-black.svg" className={'image-40x40'}/>
                    </IconButton>
                </DialogTitle>
                <DialogContent className={'dialog-content preview-image-content'}>
                    <OwlCarousel nav className='owl-theme black-nav' items={1} loop navText={["<img src='/images/prev.png'/>", "<img src='/images/next.png'/>"]}>
                        {images.map(i => <div className='item'>
                            {console.log(i)}
                            <img src={i} className={'image-container'} loading={"lazy"}/>
                        </div>
                    )}
                    </OwlCarousel>
                </DialogContent>
            </Dialog>
            {children}
        </ImageDialogContext.Provider>
    );
}