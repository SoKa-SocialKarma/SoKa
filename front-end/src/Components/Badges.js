import { useState, useEffect } from 'react'
import { Box, Container, Paper } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { useAPI } from '../Context/AuthContext'

const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(1)
    },
    badge:{
            width: '30%',
            padding: '2% 4% 2% 4%',
            margin: '1%',
    },
    badgeDetails:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    badgeImage:{
        width: '40%',
    },
    title:{
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '2% 1% 4% 1%'
    },
    info:{
        fontSize: '0.8rem',
        padding: '6% 1% 1% 1%',
        textAlign: 'center'
    }
}))


const Badge = ({badge, classes})=>{
    return(
        <Paper className={classes.badge} elevation={1}>
            <Box className={classes.badgeDetails}> 
                <span className={classes.title}>{badge.image.name}</span>
                <img src={badge.image.url} alt={badge.badge_name} className={classes.badgeImage}/>
                <span className={classes.info}>{badge.info.info}</span>
            </Box>
        </Paper>
    )
}


const Badges = () => {
    const classes = useStyles()
    const { sokaBadges } = useAPI()
    const [badges, setBadges] = useState([])

    useEffect(() => {
        setBadges(sokaBadges)
    },[sokaBadges])


    return (
        <Container className={classes.root}>
            {badges.map(badge =>{
                return(
                    <Badge key={badge.id} badge={badge} classes={classes}/>
                )
            })}          
        </Container>
    );
};

export default Badges;