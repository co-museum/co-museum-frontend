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
            <Grid item xs={12} md={6}>
                <Grid className={'footer-right-container'} container spacing={2} justifyContent={'right'} alignItems={'top'}>
                    <Grid item className='items'>
                        <img src="/images/discord.svg" className={'social-button'}/>
                        <img src="/images/twitter.svg" className={'social-button'}/>
                        <img src="/images/instagram.svg" className={'social-button'}/>
                    </Grid>
                    <Grid item className='hide-m'>
                        <a className={'text-d-none'} href={'mailto:info@co-museum.com'}>info@co-museum.com {characters.to}</a>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </footer>
}


export default Footer;