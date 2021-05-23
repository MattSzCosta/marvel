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
    fontFamily: ['Coming Soon', 'cursive']
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
      main: '#fff',
      contrastText: '#fff'
    },
    secondary: {
      main: 'rgb(100, 141, 174)',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    error: {
      main: '#FF9216'
    }
  },
  typography: {
    fontFamily: ['Coming Soon', 'cursive']
  },
  overrides: {
    MuiLinearProgress: {
      root: {
        position: 'absolute',
        zIndex: 99999,
        top: 0,
        width: '100%'
      }
    }
  }
})
