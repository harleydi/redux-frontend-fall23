import { purple } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: purple[700]
        },
        secondary: {
            main: '#b5e90b'
        }
    }
})

export const lightTheme = createTheme({
    palette: {
        mode: 'light'
    }
})