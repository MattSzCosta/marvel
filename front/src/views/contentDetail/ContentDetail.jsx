import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { Card, IconButton } from 'material-ui'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import Utils from '~/helpers/Utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyle = makeStyles((theme) => ({
  img: {
    width: '100%',
    objectFit: 'cover',
    display: 'flex',
    margin: '0'
  },
  content: {
    width: '100%',
    padding: `${theme.spacing(6)} 0`,
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  card: {
    padding: theme.spacing(1)
  }
}))

const ContentDetail = (props) => {
  const { fnService = () => {} } = props.location
  const classes = useStyle()

  const [content, setContent] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    fnService((response, error) => {
      if (!error) {
        setContent(response.data.results.shift())
        setLoading(false)
      } else {
        Utils.showError(error.response?.error)
      }
    })
  }, [setContent, Utils, setLoading, fnService])

  return (
    <Container>
      <MuiThemeProvider>
        <IconButton onClick={() => props.history.push('/')}>
          <ArrowBackIcon />
        </IconButton>
        <Card className={classes.card} raised>
          <Grid container spacing={5} justify="center">
            <Grid item xs={12} sm={8}>
              {loading ? (
                <Skeleton variant="rect" width="100%" height={500} />
              ) : (
                <img
                  className={classes.img}
                  src={`${content.thumbnail.path}.${content.thumbnail.extension}`}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {loading ? (
                <Box className={classes.content}>
                  <Skeleton variant="rect" width="100%" height={50} />
                  <span />
                  <Skeleton variant="rect" width="100%" height={100} />
                  {/* <Favorit>Favoritar</Favorit> */}
                </Box>
              ) : (
                <Box className={classes.content}>
                  <h1>{content.title || content.name}</h1>
                  <p>{content.description || content.title}</p>
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>
      </MuiThemeProvider>
    </Container>
  )
}

export default withRouter(ContentDetail)
