import React from 'react'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { useDispatch } from 'react-redux'
import { MenuItem, Menu, IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import Labels from '~/helpers/enums/Labels'
import authAction from '~/actions/authAction'

const DropdownProfile = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <IconButton id="dropdown" onClick={handleClick}>
        <ArrowDownwardIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          id="my-account"
          title={t(Labels.MENU_MY_ACCOUNT)}
          onClick={() => {
            props.history.push('/minha-conta')
          }}
        >
          {t(Labels.MENU_MY_ACCOUNT)}
        </MenuItem>
        <MenuItem
          id="logout"
          title={t(Labels.MENU_LOGOUT)}
          onClick={() => {
            dispatch(authAction.logout())
          }}
        >
          {t(Labels.MENU_LOGOUT)}
        </MenuItem>
      </Menu>
    </>
  )
}

export default withRouter(DropdownProfile)
