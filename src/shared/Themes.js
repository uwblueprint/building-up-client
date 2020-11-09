import { createMuiTheme } from '@material-ui/core/styles'

const dashboardTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#262626",
            contrastText: "#FFF"
        },
        secondary: {
            main: "#FBEBEB"
        }
    },
    typography: {
        fontFamily: ['Jost','Roboto'].join(','),
        fontSize: 16,
        h1: {
            fontSize: 36,
            fontWeight: 700
        },
        h2: {
            fontSize: 32,
            fontWeight: 600
        },
        h3: {
            fontSize: 24,
            fontWeight: 600 
        },
        h4: {
            fontSize: 20,
            fontWeight: 600 
        },
        subtitle1: {
            fontSize: 16,
            fontWeight: 600,
            textTransform: "uppercase", 
        },
        body1: {
            fontSize: 16
        },
        button: {
            fontSize: 16,
            fontWeight: 600,
        }
    }
})

const storeTheme = createMuiTheme({
    palette: {
        primary: {
            light: "#7c7c7c",
            main: "#000000",
            contrastText: "#FFF"
        },
        secondary: {
            light: "#CD1000",
            main: "#B20E00"
        }
    },
    typography: {
        fontFamily: ['Jost','Roboto'].join(','),
        fontSize: 16,
        h1: {
            fontSize: 60,
            fontWeight: 700,
            textTransform: "uppercase", 
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        },
        h2: {
            fontSize: 48,
            fontWeight: 700,
            textTransform: "uppercase", 

        },
        h3: {
            fontSize: 28,
            fontWeight: 700,
            textTransform: "uppercase", 

        },
        h4: {
            fontSize: 24,
            fontWeight: 700,
            textTransform: "uppercase", 

        },
        subtitle1: {
            fontSize: 15,
            fontWeight: 700,
            textTransform: "uppercase", 
        },
        body1: {
            fontSize: 16
        },
        button: {
            fontSize: 16,
            fontWeight: 600,
        }
    }
})

export { dashboardTheme, storeTheme }
