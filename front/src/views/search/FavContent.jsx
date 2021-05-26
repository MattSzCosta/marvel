import React, { useCallback, useEffect, useState } from 'react'
import marvelService from '~/services/marvelService'
import ContentCard from '~/components/common/ContentCard/ContentCard'
import { Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import Utils from '~/helpers/Utils'
import { useHistory } from 'react-router'
import marvelAction from '~/actions/marvelAction'

const FavContent = (props) => {
  const { search = '', type, content = [], service } = props
  const [filteredValue, setFilteredValue] = useState([])
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(marvelAction.getAllLikedContent())
  }, [dispatch, marvelAction])

  const setDefaultValue = useCallback(
    (values, inputSearch) => {
      console.log('setDefaultValue')
      let filter = []
      if (inputSearch) {
        filter = values.filter((val) => {
          console.log(val)
          val && val?.name.toLowerCase().includes(inputSearch.toLowerCase())
        })
      } else {
        filter = values
      }
      setFilteredValue(filter)
    },
    [setFilteredValue]
  )

  const handleServiceLike = (con) => {
    marvelService
      .setLikeContent({ ...con, type })
      .then(() => {
        dispatch(marvelAction.getAllLikedContent())
      })
      .catch((err) => Utils.showError(err.response.data))
  }

  useEffect(() => setDefaultValue(content, search), [content, search])

  const setHistory = (id) => {
    history.push({
      pathname: '/detail/',
      fnService: Utils.makeService(service, id)
    })
  }

  return (
    <Grid container direction="row" justify="space-around" spacing={2}>
      {filteredValue.map((val) => (
        <Grid
          item
          md={4}
          xs={12}
          key={uuid()}
          onClick={() => setHistory(val.id)}
        >
          <ContentCard
            apiId={val.id}
            liked={true}
            name={val.name}
            thumb={`${val.thumb}`}
            serviceLike={handleServiceLike}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default FavContent
