/* eslint-disable no-unused-vars */
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Card } from 'material-ui'
import { MuiThemeProvider } from 'material-ui/styles'
import React from 'react'
// import StarIcon from '@material-ui/icons/Star'
// import StarOutlineIcon from '@material-ui/icons/StarOutline'

const useStyle = makeStyles((theme) => ({
  img: {
    width: theme.spacing(20),
    height: theme.spacing(23),
    objectFit: 'cover',
    display: 'flex',
    margin: '0'
  },
  card: {
    cursor: 'pointer',
    margin: theme.spacing(2),
    width: theme.spacing(49),
    height: theme.spacing(25),
    '&:hover': {
      boxShadow:
        '0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%)!important'
    }
  },
  boxText: {
    alignItems: 'center',
    display: 'flex',
    textAlign: 'end',
    justifyContent: 'center'
  }
}))

const ContentCard = ({ title, image, description, id, liked }) => {
  console.log(title, description, liked)
  const classes = useStyle()
  return (
    <MuiThemeProvider>
      <Card key={id} className={classes.card}>
        <Grid container direction="row" spacing={1} justify="center">
          <Grid item md={5} xs={8}>
            <img src={image} className={classes.img} />
          </Grid>
          <Grid item md={5} xs={4} className={classes.boxText}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {title}{' '}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </MuiThemeProvider>
  )
}
export default ContentCard
