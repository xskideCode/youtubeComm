import React from 'react'
import { TextField, Grid, InputAdornment, IconButton, ThemeProvider, createTheme, styled} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const CssTextField = styled(TextField)({
    
    "& .MuiInputBase-root": {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: 'deepPurple-700',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'indigo',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'deepPurple-900',
      },
    },
  });

const Input = ({ name, handleChange, label, half, autoFocus, type, }) => {

    const theme = createTheme({
        mode: 'dark',
        palette: {
          primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
          },
        },
        typography: {
            allVariants: {
              color: "white"
            },
          },
          
      });

  return (
    <ThemeProvider theme={theme}>
    <Grid item xs={12} sm={half ? 6 : 12}>
        <CssTextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            color="secondary"
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === "password" ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            } : null}
        />
    </Grid>
    </ThemeProvider>
  )
}

export default Input