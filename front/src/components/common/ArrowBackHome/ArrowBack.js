import { IconButton } from 'material-ui'
import React from 'react'
import { useHistory } from 'react-router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@material-ui/core'

const style = makeStyles((theme) => ({
  icon: {
    color: '#1890ff'
  },
  content: {
    margin: theme.spacing(1)
  }
}))
const ArrowBack = () => {
  const history = useHistory()
  const classes = style()
  return (
    <IconButton className={classes.content} onClick={() => history.push('/')}>
      <ArrowBackIcon fontSize="large" className={classes.icon} />
    </IconButton>
  )
}

export default ArrowBack
