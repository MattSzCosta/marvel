import React from 'react'
import { Grid, Button, makeStyles, Typography } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import authAction from '~/actions/authAction'
import Utils from 'helpers/Utils'
import Labels from '~/helpers/enums/Labels'
import { useTranslation } from 'react-i18next'
import TextFieldCustom from '../common/TextField/TextFieldCustom'

const useStyle = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(3)
  },
  singup: {
    cursor: 'pointer'
  }
}))

const LoginForm = (props) => {
  const { setFormStatus } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const classe = useStyle()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t(Labels.LOGIN_USER_REQUIRED_FORMAT))
      .required(t(Labels.LOGIN_USER_REQUIRED)),
    password: Yup.string().required(t(Labels.LOGIN_PASSWORD_REQUIRED))
  })

  const handleKeyPress = (event, submitForm) => {
    if (event.key === 'Enter') submitForm()
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          authAction.sendCredentials(values, (error) => {
            setSubmitting(false)
            if (!error) return
            Utils.showError(t(Labels.LOGIN_ACCESS_DENIED))
          })
        )
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form className={classe.form}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={12}>
              <Field
                component={TextFieldCustom}
                name="email"
                type="text"
                label={t(Labels.LOGIN_USER)}
                fullWidth
                margin="normal"
                color="primary"
                variant="outlined"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextFieldCustom}
                type="password"
                color="primary"
                label={t(Labels.LOGIN_PASSWORD)}
                name="password"
                fullWidth
                margin="normal"
                variant="outlined"
                onKeyPress={(event) => handleKeyPress(event, submitForm)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                color="primary"
                variant="subtitle1"
                gutterBottom
                className={classe.singup}
                onClick={() => setFormStatus(false)}
              >
                {t(Labels.LOGIN_SINUP)}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                id="login-submit-button"
                color="secondary"
                variant="contained"
                className="login-button"
                size="medium"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {t(Labels.LOGIN_SUBMIT)}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
