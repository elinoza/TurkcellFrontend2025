import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import themeOptions from '../themeOptions.js'
import { SpotifyProvider } from './Context/SpotifyContext.jsx';

document.getElementById('root').style.height = "100vh"


const theme = createTheme(themeOptions())
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SpotifyProvider>
      <App/>
      </SpotifyProvider>
    </ThemeProvider>
  </StrictMode>
)
