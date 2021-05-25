import { Box } from '@material-ui/core'
import { TextField } from 'material-ui'
import React, { useState } from 'react'
import TabPanel from '~/components/common/Tabs/TabPanel'
import { AntTab, AntTabs } from '~/components/common/Tabs/Tabs'
import Chars from './Chars'
import Comics from './Comics'
import debounce from 'lodash.debounce'
import { MuiThemeProvider } from 'material-ui/styles'

const ENUM = {
  COMICS: 0,
  CHARS: 1
}

const Search = () => {
  const [value, setChange] = useState(ENUM.COMICS)
  const [inputValue, setInput] = useState('')
  const handleChange = (_, val) => {
    setInput('')
    setChange(val)
  }

  const debouncedSave = debounce((nextValue) => setInput(nextValue), 1200)

  const handleChangeInput = (event) => {
    debouncedSave(event.target.value)
  }

  console.log(inputValue)

  return (
    <MuiThemeProvider>
      <AntTabs value={value} onChange={handleChange} centered>
        <AntTab valeu={ENUM.COMICS} label="Comics" />
        <AntTab valeu={ENUM.CHARS} label="Personagens" />
      </AntTabs>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <TextField id="search" onBlur={handleChangeInput} />
      </Box>

      <Box style={{ height: '100%' }}>
        <TabPanel value={value} index={ENUM.COMICS}>
          <Comics search={inputValue} />
        </TabPanel>
        <TabPanel value={value} index={ENUM.CHARS}>
          <Chars search={inputValue} />
        </TabPanel>
      </Box>
    </MuiThemeProvider>
  )
}

export default Search
