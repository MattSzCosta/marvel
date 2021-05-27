import React, { useCallback, useState, useEffect } from 'react'
import Utils from '~/helpers/Utils'
import marvelService from '~/services/marvelService'
import InfiniteScroll from 'react-infinite-scroll-component'
import ContentCard from '~/components/common/ContentCard/ContentCard'
import uuid from 'react-uuid'
import { Box, Grid, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import marvelAction from '~/actions/marvelAction'

const ScrollContent = (props) => {
  const { search = '', service, serviceDetail, type, arrLiked } = props
  const [limit] = useState(24)
  const [offset, setOffset] = useState(0)
  const [comics, setComics] = useState([])
  const [total, setTotal] = useState(0)
  const history = useHistory()
  const dispatch = useDispatch()

  const getComics = useCallback(
    (inputSearch, inputOffset) => {
      service({ search: inputSearch, limit, offset: inputOffset })
        .then((res) => {
          if (inputOffset > 0) {
            setComics([...comics, ...res.data.results])
          } else {
            setComics(res.data.results)
          }

          setOffset(
            res.data.total > res.data.offset ? res.data.offset + limit : offset
          )
          setTotal(res.data.total)
        })
        .catch((err) => {
          Utils.showError(err.response?.error)
        })
    },
    [
      marvelService,
      limit,
      comics,
      setComics,
      setTotal,
      setOffset,
      Utils,
      service
    ]
  )
  useEffect(() => {
    getComics(search, 0)
  }, [search])

  const setHistory = (id) => {
    history.push({
      pathname: '/detail/',
      fnService: Utils.makeService(serviceDetail, id)
    })
  }

  const handleServiceLike = (content) => {
    marvelService
      .setLikeContent({ ...content, type })
      .then(() => dispatch(marvelAction.getAllLikedContent()))
      .catch((err) => Utils.showError(err.response.data))
  }

  const verifyLike = (id) =>
    arrLiked.find((element) => element?.apiId.toString() === id.toString())
  return (
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      scrollThreshold={0.5}
      dataLength={comics.length}
      next={() => getComics(search, offset)}
      hasMore={total > offset}
      loader={
        <Box>
          <Typography>Loading...</Typography>
        </Box>
      }
    >
      <Grid container direction="row" justify="space-around" spacing={2}>
        {comics.map((val) => (
          <Grid
            item
            md={4}
            xs={12}
            key={uuid()}
            onClick={() => setHistory(val.id)}
          >
            <ContentCard
              apiId={val.id}
              liked={verifyLike(val.id)}
              name={val.title || val.name}
              thumb={`${val.thumbnail.path}.${val.thumbnail.extension}`}
              serviceLike={handleServiceLike}
            />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}

export default ScrollContent
