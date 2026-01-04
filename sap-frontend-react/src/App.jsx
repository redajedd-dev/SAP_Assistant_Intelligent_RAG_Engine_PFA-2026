import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Box,
    ListItemButton,
    useMediaQuery,
    useTheme,
    Avatar,
    Fade
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // AI Sparkles
import InsightsIcon from '@mui/icons-material/Insights'; // Data
import DashboardIcon from '@mui/icons-material/Dashboard';

import ChatAssistant from './pages/ChatAssistant';
import DataMonitor from './pages/DataMonitor';

const drawerWidth = 260;

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Assistant Intelligent', icon: <AutoAwesomeIcon />, path: '/' },
        { text: 'Données ERP', icon: <InsightsIcon />, path: '/data' },
    ];

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
            <Toolbar sx={{ px: 3, mb: 2, mt: 1 }}>
                <Avatar
                    sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32, boxShadow: '0 4px 10px rgba(0,98,230,0.4)' }}
                    variant="rounded"
                >
                    <DashboardIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.5px' }}>
                    SAP GenAI
                </Typography>
            </Toolbar>

            <List sx={{ px: 2 }}>
                {menuItems.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => {
                                    navigate(item.path);
                                    setMobileOpen(false);
                                }}
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: active ? 'rgba(0, 98, 230, 0.08)' : 'transparent',
                                    color: active ? 'primary.main' : 'text.secondary',
                                    '&:hover': {
                                        bgcolor: active ? 'rgba(0, 98, 230, 0.12)' : 'rgba(0,0,0,0.03)',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: active ? 'primary.main' : 'inherit', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontWeight: active ? 600 : 500, fontSize: '0.95rem' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ mt: 'auto', p: 3 }}>
                <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.6 }}>
                    v1.0.0 (Beta)
                    <br />
                    Powered by Gemini
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
            <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ color: 'text.primary', fontWeight: 700 }}>
                        {menuItems.find(i => i.path === location.pathname)?.text || 'Dashboard'}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderWidth: 0 } }}
                >
                    {drawerContent}
                </Drawer>
                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderWidth: 0 } }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8
                }}
            >
                <Fade in timeout={500}>
                    <Box>
                        <Routes>
                            <Route path="/" element={<ChatAssistant />} />
                            <Route path="/data" element={<DataMonitor />} />
                        </Routes>
                    </Box>
                </Fade>
            </Box>
        </Box>
    );
}

export default App;
