import React from 'react'
import ScrollContent from '~/components/common/ScrollContent/ScrollContent'
import marvelService from '~/services/marvelService'

const Chars = (props) => {
  const { search = '', arrLiked } = props

  return (
    <ScrollContent
      style={{ height: '100%' }}
      type={'characters'}
      arrLiked={arrLiked}
      service={marvelService.getChars}
      serviceDetail={marvelService.getCharDetail}
      search={search}
    />
  )
}

export default Chars
