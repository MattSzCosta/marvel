import React, { useCallback, useState, useEffect } from 'react'
import Utils from '~/helpers/Utils'
import marvelService from '~/services/marvelService'
import InfiniteScroll from 'react-infinite-scroll-component'
import ContentCard from '~/components/common/ContentCard/ContentCard'
import uuid from 'react-uuid'
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router'

const Comics = (props) => {
  const { search = '' } = props
  const [limit] = useState(24)
  const [offset, setOffset] = useState(0)
  const [comics, setComics] = useState([])
  const [total, setTotal] = useState(0)
  const history = useHistory()

  const getComics = useCallback(
    (inputSearch, inputOffset) => {
      marvelService
        .getComics({ search: inputSearch, limit, offset: inputOffset })
        .then((res) => {
          setComics([...comics, ...res.data.results])
          setOffset(
            res.data.total > res.data.offset ? res.data.offset + limit : offset
          )
          setTotal(res.data.total)
        })
        .catch((err) => {
          Utils.showError(err.response?.error)
        })
    },
    [marvelService, limit, comics, setComics, setTotal, setOffset, Utils]
  )
  useEffect(() => {
    getComics(search, offset)
  }, [])

  const setHistory = (id) => {
    history.push({
      pathname: '/detail/',
      fnService: Utils.makeService(marvelService.getComicDetail, id)
    })
  }
  return (
    <React.Fragment>
      <InfiniteScroll
        style={{ height: '100%' }}
        scrollThreshold={0.5}
        dataLength={comics.length}
        next={() => getComics(search, offset)}
        hasMore={total > offset}
        loader={<h4>Loading...</h4>}
      >
        <Grid container direction="row" justify="space-between" spacing={2}>
          {comics.map((val) => (
            <Grid
              md={4}
              xs={12}
              key={uuid()}
              onClick={() => setHistory(val.id)}
            >
              <ContentCard
                id={val.id}
                title={val.title}
                description={val.title}
                image={`${val.thumbnail.path}.${val.thumbnail.extension}`}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </React.Fragment>
  )
}

export default Comics
