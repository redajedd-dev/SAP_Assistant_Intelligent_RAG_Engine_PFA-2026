import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    IconButton,
    List,
    ListItem,
    Avatar,
    Fade,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import axios from 'axios';

const ChatAssistant = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Bonjour ! Je suis l\'assistant GenAI. Comment puis-je vous aider à analyser vos données SAP aujourd\'hui ?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/api/chat', { prompt: input });
            setMessages(prev => [...prev, { role: 'assistant', content: response.data.answer }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, je rencontre un problème technique pour joindre le serveur." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', height: '80vh', display: 'flex', flexDirection: 'column', gap: 2 }}>

            {/* Messages Area */}
            <Paper
                elevation={0}
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    borderRadius: 4,
                    bgcolor: 'white',
                    border: '1px solid rgba(0,0,0,0.06)',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
                    overflow: 'hidden'
                }}
            >
                <List sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
                    {messages.map((msg, idx) => {
                        const isUser = msg.role === 'user';
                        return (
                            <Fade in key={idx} timeout={500}>
                                <ListItem
                                    sx={{
                                        display: 'flex',
                                        justifyContent: isUser ? 'flex-end' : 'flex-start',
                                        mb: 2,
                                        alignItems: 'flex-start',
                                        gap: 1.5
                                    }}
                                    disablePadding
                                >
                                    {!isUser && (
                                        <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36, boxShadow: '0 4px 10px rgba(255, 0, 128, 0.3)' }}>
                                            <AutoAwesomeIcon fontSize="small" />
                                        </Avatar>
                                    )}

                                    <Box
                                        sx={{
                                            p: 2.5,
                                            bgcolor: isUser ? 'primary.main' : 'white',
                                            color: isUser ? 'white' : 'text.primary',
                                            maxWidth: '75%',
                                            borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                            boxShadow: isUser
                                                ? '0 4px 15px rgba(0, 98, 230, 0.3)'
                                                : '0 2px 10px rgba(0,0,0,0.05)',
                                            border: isUser ? 'none' : '1px solid rgba(0,0,0,0.06)',
                                            position: 'relative'
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ lineHeight: 1.6, fontSize: '0.95rem' }}>
                                            {msg.content}
                                        </Typography>
                                    </Box>

                                    {isUser && (
                                        <Avatar sx={{ bgcolor: 'primary.dark', width: 36, height: 36 }}>
                                            <PersonOutlineRoundedIcon fontSize="small" />
                                        </Avatar>
                                    )}
                                </ListItem>
                            </Fade>
                        );
                    })}
                    {loading && (
                        <Box sx={{ display: 'flex', gap: 2, ml: 1, mt: 1 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
                                <SmartToyOutlinedIcon fontSize="small" />
                            </Avatar>
                            <Paper sx={{ p: 2, borderRadius: '20px 20px 20px 4px', bgcolor: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress size={16} thickness={5} color="secondary" />
                                <Typography variant="caption" color="text.secondary">Analyse en cours...</Typography>
                            </Paper>
                        </Box>
                    )}
                    <div ref={bottomRef} />
                </List>
            </Paper>

            {/* Input Area */}
            <Paper
                elevation={0}
                component="form"
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                sx={{
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 50,
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    bgcolor: 'white'
                }}
            >
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Posez votre question à l'IA..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    InputProps={{
                        disableUnderline: true,
                        sx: { px: 3, py: 1.5, fontSize: '1rem' }
                    }}
                />
                <IconButton
                    disabled={!input.trim() || loading}
                    type="submit"
                    color="primary"
                    sx={{
                        width: 48,
                        height: 48,
                        bgcolor: input.trim() ? 'primary.main' : 'action.disabledBackground',
                        color: 'white !important',
                        mr: 0.5,
                        transition: 'all 0.2s',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                            transform: 'scale(1.05)'
                        }
                    }}
                >
                    <SendRoundedIcon fontSize="small" />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default ChatAssistant;
