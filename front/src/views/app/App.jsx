// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { Suspense, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import signupAction from '~/actions/authAction'
import BaseLayout from '~/components/app/layout/BaseLayout'
import Routers from '~/components/app/routers/Routers'
import Constants from '~/helpers/enums/Constants'
import Labels from '~/helpers/enums/Labels'
import Utils from '~/helpers/Utils'
import { version } from '../../../package.json'

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { language } = useSelector((state) => state.language)

  const dispatch = useDispatch()
  const { i18n } = useTranslation()

  useEffect(() => {
    dispatch(signupAction.verifyCredentialsAuthentication(isAuthenticated))
    i18n.changeLanguage(language)
  }, [dispatch, isAuthenticated, language, i18n])

  const hasTokenValid = Utils.hasTokenValid()

  window.onload = () => {
    if (localStorage.getItem(Constants.TOKEN_INVALID) === 'true') {
      localStorage.setItem(Constants.TOKEN_INVALID, false)

      Utils.showTranslatedToast({
        type: Constants.WARNING,
        description: Labels.SESSION_EXPIRED
      })
    }
  }
  return (
    <Suspense fallback="loading">
      <Helmet>
        <title>{`Marvel Comics - v${version}`}</title>
        <meta name="version" content={version || '1.0.0'} />
      </Helmet>

      {isAuthenticated || hasTokenValid ? (
        // <MuiPickersUtilsProvider locale={t(Labels.LOCALE)}>
        <BaseLayout.AuthenticatedLayout>
          <Routers.Authenticated />
        </BaseLayout.AuthenticatedLayout>
      ) : (
        // </MuiPickersUtilsProvider>
        <BaseLayout.AnonymousLayout>
          <Routers.Anonymous />
        </BaseLayout.AnonymousLayout>
      )}
    </Suspense>
  )
}

export default App
