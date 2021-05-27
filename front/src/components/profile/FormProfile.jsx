import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import Utils from 'helpers/Utils'
import Labels from '~/helpers/enums/Labels'
import { useTranslation } from 'react-i18next'
import { Button, Grid } from '@material-ui/core'
import TextFieldCustom from '../common/TextField/TextFieldCustom'
import userAction from '~/actions/userAction'
import { useHistory } from 'react-router'

const FormProfile = (props) => {
  const { user } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const history = useHistory()

  const schema = Yup.object().shape({
    firstName: Yup.string().required(t(Labels.LOGIN_FIRST_NAME_REQUIRED)),
    lastName: Yup.string().required(t(Labels.LOGIN_LAST_NAME_REQUIRED)),
    email: Yup.string()
      .email(t(Labels.LOGIN_USER_REQUIRED_FORMAT))
      .required(t(Labels.LOGIN_USER_REQUIRED)),
    password: Yup.string().required(t(Labels.LOGIN_PASSWORD_REQUIRED)),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t(Labels.LOGIN_CONFIRM_PASSWORD_REQUIRED))
      .required('Campo obrigatório')
  })

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: '' || user?.email,
        password: '',
        confirmPassword: '',
        firstName: '' || user?.firstName,
        lastName: '' || user?.lastName
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          userAction.updateUser(values, (error) => {
            setSubmitting(false)
            if (!error) {
              Utils.showSuccess(t(Labels.LOGIN_SUCCESSFULLY_LOGGED))
              history.push('/')
              return
            }
            Utils.showError(t(Labels.LOGIN_ACCESS_DENIED))
          })
        )
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={6}>
              <Field
                component={TextFieldCustom}
                name="firstName"
                type="text"
                label={t(Labels.LOGIN_FIRST_NAME)}
                fullWidth
                disabled={isSubmitting}
                margin="normal"
                color="primary"
                variant="outlined"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                component={TextFieldCustom}
                name="lastName"
                type="text"
                label={t(Labels.LOGIN_LAST_NAME)}
                fullWidth
                disabled={isSubmitting}
                margin="normal"
                color="primary"
                variant="outlined"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextFieldCustom}
                name="email"
                type="text"
                label={t(Labels.LOGIN_USER)}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
                name="password"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextFieldCustom}
                type="password"
                color="primary"
                label={t(Labels.LOGIN_CONFIRM_PASSWORD)}
                disabled={isSubmitting}
                name="confirmPassword"
                fullWidth
                margin="normal"
                variant="outlined"
              />
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

export default FormProfile
