import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import {DialogWrapper} from "./DialogWrapper";
import {ImageDialog} from "./ImageDialog";


const PageLayout = ({children, title= 'Co-Museum'}) => {
    return <DialogWrapper>
        <ImageDialog>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
            </Head>
            <Header/>
            <main className={'main-container'}>
                {children}
            </main>
            <Footer/>
        </ImageDialog>
        <link href="/static/style.css" rel="stylesheet" />
    </DialogWrapper>
}

export default PageLayout;