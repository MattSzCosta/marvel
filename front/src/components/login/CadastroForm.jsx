import React from 'react'
import {
  Grid,
  Button,
  makeStyles,
  Container,
  ButtonGroup
} from '@material-ui/core'
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
  }
}))

const CadastroForm = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const classe = useStyle()
  const { setFormStatus } = props

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

  const setFormLogin = () => {
    setFormStatus(true)
  }

  return (
    <Container>
      <Formik
        validationSchema={schema}
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          lastName: '',
          firstName: ''
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            authAction.register(values, (error) => {
              setSubmitting(false)
              if (!error) {
                Utils.showSuccess(t(Labels.LOGIN_SUCCESSFULLY_LOGGED))
                setFormLogin()
                return
              }
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
                  type="password"
                  color="primary"
                  label={t(Labels.LOGIN_PASSWORD)}
                  name="password"
                  fullWidth
                  disabled={isSubmitting}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={TextFieldCustom}
                  type="password"
                  color="primary"
                  label={t(Labels.LOGIN_CONFIRM_PASSWORD)}
                  name="confirmPassword"
                  fullWidth
                  disabled={isSubmitting}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  color="secondary"
                >
                  <Button
                    id="login-back-button"
                    size="medium"
                    disabled={isSubmitting}
                    onClick={setFormLogin}
                  >
                    {t(Labels.BACK)}
                  </Button>
                  <Button
                    id="login-submit-button"
                    size="medium"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    {t(Labels.LOGIN_SUBMIT)}
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default CadastroForm
