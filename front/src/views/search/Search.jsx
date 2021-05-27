import { Box, makeStyles } from '@material-ui/core'
import { TextField } from 'material-ui'
import React, { useState } from 'react'
import TabPanel from '~/components/common/Tabs/TabPanel'
import { AntTab, AntTabs } from '~/components/common/Tabs/Tabs'
import Chars from './Chars'
import Comics from './Comics'
import debounce from 'lodash.debounce'
import { MuiThemeProvider } from 'material-ui/styles'
import FavContent from './FavContent'
import { useSelector } from 'react-redux'
import marvelService from '~/services/marvelService'

const style = makeStyles(() => ({
  inputContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  contentTabs: {
    height: '100%'
  }
}))

const ENUM = {
  COMICS: 0,
  CHARS: 1,
  FAV_COMICS: 2,
  FAV_CHAR: 3
}

const Search = () => {
  const [value, setChange] = useState(ENUM.COMICS)

  const classes = style()
  const { favComics, favChars } = useSelector((state) => state.marvel)
  const [inputValue, setInput] = useState('')
  const handleChange = (_, val) => {
    setInput('')
    setChange(val)
  }

  const debouncedSave = debounce((nextValue) => setInput(nextValue), 1200)

  const handleChangeInput = (event) => {
    debouncedSave(event.target.value)
  }

  return (
    <MuiThemeProvider>
      <AntTabs value={value} onChange={handleChange} centered>
        <AntTab valeu={ENUM.COMICS} label="Comics" />
        <AntTab valeu={ENUM.CHARS} label="Personagens" />
        <AntTab valeu={ENUM.FAV_COMICS} label="Fav. Comic" />
        <AntTab valeu={ENUM.FAV_CHAR} label="Fav. Chars" />
      </AntTabs>
      <Box className={classes.inputContent}>
        <TextField
          id="search"
          placeholder="Search"
          onBlur={handleChangeInput}
        />
      </Box>

      <Box className={classes.contentTabs}>
        <TabPanel value={value} index={ENUM.COMICS}>
          <Comics search={inputValue} arrLiked={favComics} />
        </TabPanel>
        <TabPanel value={value} index={ENUM.CHARS}>
          <Chars search={inputValue} arrLiked={favChars} />
        </TabPanel>
        <TabPanel value={value} index={ENUM.FAV_COMICS}>
          <FavContent
            search={inputValue}
            content={favComics}
            service={marvelService.getComicDetail}
            type={'comics'}
          />
        </TabPanel>
        <TabPanel value={value} index={ENUM.FAV_CHAR}>
          <FavContent
            search={inputValue}
            service={marvelService.getCharDetail}
            content={favChars}
            type={'characters'}
          />
        </TabPanel>
      </Box>
    </MuiThemeProvider>
  )
}

export default Search
