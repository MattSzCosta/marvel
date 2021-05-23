import { makeStyles } from '@material-ui/core/styles'
const MuiStylesBaseLayout = makeStyles((theme) => ({
  message: {
    //fontSize = 14px
    fontSize: theme.spacing(1.75),
    color: '#2D2D2D'
  },
  relativeDate: {
    //fontSize = 12px
    fontSize: '0.878477306vw'
  },
  subject: {
    fontWeight: 700,
    fontSize: theme.spacing(1.75)
  },
  notificationBadge: {
    '& span': {
      backgroundColor: '#FCD400'
    }
  }
}))

export default MuiStylesBaseLayout
