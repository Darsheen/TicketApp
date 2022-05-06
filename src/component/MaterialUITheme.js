import { createTheme } from '@mui/material/styles';

const materialTheme = createTheme({

    typography: {
        fontSize: 22,
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeightMedium:300
    },
    palette: {
        primary: {
            light: '#5E7BFD',
            main: '#5EBAFE',
            dark: '#3A53A2'         
        },
        secondary: {
            light: '#FFC5F6',
            main: '#EBD4F7',
            dark: '#FF9FB1',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
})

export { materialTheme };
