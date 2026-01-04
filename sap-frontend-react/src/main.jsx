import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import App from './App.jsx';

// Définition d'un thème "Premium & Modern"
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0062E6', // Vibrant SAP Blue
            light: '#33B5E5',
            dark: '#003366',
        },
        secondary: {
            main: '#FF0080', // Modern Magenta for accents
        },
        background: {
            default: '#F5F7FA', // Soft gray background
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1A2027',
            secondary: '#5E6E79',
        }
    },
    shape: {
        borderRadius: 16,
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h5: {
            fontWeight: 700,
            letterSpacing: '-0.5px'
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none', // Modern buttons don't shout
            fontWeight: 600,
            borderRadius: 12,
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Soft shadow
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(0, 98, 230, 0.2)',
                    },
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    color: '#1A2027',
                    boxShadow: '0px 1px 0px rgba(0,0,0,0.05)',
                }
            }
        }
    },
});

const globalStyles = {
    'body': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        backgroundColor: '#F5F7FA',
    },
    '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
    },
    '::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
        background: '#CFD8DC',
        borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb:hover': {
        background: '#B0BEC5',
    },
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={globalStyles} />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
