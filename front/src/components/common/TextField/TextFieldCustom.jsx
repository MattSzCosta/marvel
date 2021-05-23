import { withStyles } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
const TextFieldCustom = withStyles({
  root: {
    '& .MuiFormLabel-root': {
      color: 'white'
    },
    '& .MuiInputBase-root': {
      color: 'white'
    },
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'white'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white'
      }
    }
  }
})(TextField)

export default TextFieldCustom
