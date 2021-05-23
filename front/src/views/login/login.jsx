import React, { useState } from 'react'
import { Box, Card, makeStyles, Typography } from '@material-ui/core'
import LoginForm from '~/components/login/LoginForm'
import CadastroForm from '~/components/login/CadastroForm'
import Labels from '~/helpers/enums/Labels'
import { useTranslation } from 'react-i18next'

const useStyle = makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  card: {
    backgroundColor: '#333',
    borderRadius: theme.spacing(3),
    boxShadow: '5px 0px 28px 5px rgba(0,0,0,0.43)',
    opacity: 0.99,
    maxWidth: '60%'
  },
  title: {
    paddingTop: theme.spacing(2)
  }
}))

const Login = () => {
  const classes = useStyle()
  const [formStatus, setFormStatus] = useState(1)
  const { t } = useTranslation()

  return (
    <Box className={classes.box}>
      <Card className={classes.card} raised>
        <Typography
          align="center"
          color="primary"
          variant="h2"
          component="h1"
          gutterBottom
          className={classes.title}
        >
          {t(Labels.LOGIN_TITLE)}
        </Typography>
        {formStatus ? (
          <LoginForm setFormStatus={setFormStatus} />
        ) : (
          <CadastroForm setFormStatus={setFormStatus} />
        )}
      </Card>
    </Box>
  )
}

export default Login
