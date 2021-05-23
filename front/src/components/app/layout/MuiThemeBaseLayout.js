const { createMuiTheme } = require('@material-ui/core')

export const authenticatedTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#006FAB',
      contrastText: '#fff'
    },
    secondary: {
      main: '#006FAB',
      contrastText: '#D7D4D2'
    }
  },
  typography: {
    fontFamily: ['Gotham', 'Gotham Rounded', 'FS Albert', 'sans-serif']
  },
  overrides: {
    MuiContainer: {
      root: {
        height: '100%'
      }
    }
  },
  spacing: (factor) => `${0.585651537 * factor}vw`
})

export const anonymousTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0075be',
      contrastText: '#6AE5FF'
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff'
    },
    error: {
      main: '#FF9216'
    }
  },
  typography: {
    fontFamily: ['Gotham', 'Gotham Rounded', 'FS Albert', 'sans-serif']
  },
  overrides: {
    MuiLinearProgress: {
      root: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        width: '100%'
      }
    }
  }
})
