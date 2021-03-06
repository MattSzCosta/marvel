import React from 'react'
import marvelService from '~/services/marvelService'
import ScrollContent from '~/components/common/ScrollContent/ScrollContent'

const Comics = (props) => {
  const { search = '', arrLiked } = props

  return (
    <ScrollContent
      style={{ height: '100%' }}
      type={'comics'}
      arrLiked={arrLiked}
      service={marvelService.getComics}
      serviceDetail={marvelService.getComicDetail}
      search={search}
    />
  )
}

export default Comics
