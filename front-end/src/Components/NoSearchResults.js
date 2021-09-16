import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import brokenSearch from '../Assets/brokenSearch.svg'

import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

export default function NoSearchResults () {
  const [open, setOpen] = useState(true)
  const history = useHistory()

  const handleCloseAlert = () => {
    setOpen(false)
    history.push('/')
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <Dialog
        open={open}
        onClose={handleCloseAlert}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'NO RESULTS WERE FOUND'}
          <img
            src={brokenSearch}
            alt='broken search'
            style={{
              width: '36px',
              height: '36px',
              transform: 'translate(-14px,-8px)'
            }}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Perhaps you should try a different search combination ?
            <br />
            <br />
            Possibilities include:
            <hr />
            <table>
              <tr>
                <th>Borough</th>
                <th>&emsp;&emsp;+&emsp;&emsp;</th>
                <th>Radius</th>
              </tr>
              <tr>
                <th>Borough</th>
                <th>&emsp;&emsp;+&emsp;&emsp;</th>
                <th>Gender</th>
              </tr>
              <tr>
                <th>Gender</th>
                <th>&emsp;&emsp;+&emsp;&emsp;</th>
                <th>Radius</th>
              </tr>
              <tr>
                <th>Gender</th>
                <th>&emsp;&emsp;+&emsp;&emsp;</th>
                <th>Borough</th>
                <th>&emsp;&emsp;+&emsp;&emsp;</th>
                <th>Radius</th>
              </tr>
              <hr />
              <tr>
                <th>Goals</th>
                <th>&emsp;&ensp;||&ensp;&emsp;</th>
                <th>Experience</th>
                <th>&emsp;&ensp;||&ensp;&emsp;</th>
                <th>&ensp;&emsp;Day</th>
              </tr>
            </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color='primary'>
            CANCEL
          </Button>
          <Button onClick={() => history.push('/')} color='primary'>
            TRY AGAIN
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
