import React from 'react'
import weStillLoveYou from '../Assets/weStillLoveYou.svg'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ouch: {
    width: '50%'
  }
}))

const WeLoveYou = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <span className='tracking-in-contract' id='weloveyou'>
        We Still Love you!
      </span>
      <img src={weStillLoveYou} alt='bad-experience' className={classes.ouch} />
    </div>
  )
}

export default WeLoveYou
