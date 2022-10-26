import {Grid, Typography} from "@mui/material";
import {characters} from "../constants/characters";


const Footer = () => {
    return <footer className={'footer'}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography>
                    © 2022 Co-Museum. All Rights Reserved.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} className='mt-0-m'>
                <Grid className={'footer-right-container mt-0-m'} container spacing={2} justifyContent={'right'} alignItems={'top'}>
                    <Grid item>
                        <a className={'text-d-none'} href={'#'}>Terms & Conditions <span className='link-arrow'>{characters.to}</span></a>
                    </Grid>
                    <Grid item>
                        <a className={'text-d-none'} href={'https://docs.co-museum.com/about-co-museum/readme'} target={'_blank'}>Go to Docs <span className='link-arrow'>{characters.to}</span></a>
                    </Grid>
                    <Grid item className='items'>
                        <a href={process.env.NEXT_PUBLIC_COLLECTION_LINK} target={'_blank'}><img src="/images/opensee-svg.png" className={'social-button'}/></a>
                        <a href={'#'} target={'_blank'}><img src="/images/discord.svg" className={'social-button'}/></a>
                        <a href={'https://twitter.com/co_museum'} target={'_blank'}><img src="/images/twitter.svg" className={'social-button'}/></a>
                        <a href={'https://www.instagram.com/co_museum/'} target={'_blank'}><img src="/images/instagram.svg" className={'social-button'}/></a>
                    </Grid>
                    <Grid item>
                        <a className={'text-d-none'} href={'mailto:info@co-museum.com'}>info@co-museum.com <span className='link-arrow'>{characters.to}</span></a>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </footer>
}


export default Footer;