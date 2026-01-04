import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    Alert,
    Fade,
    LinearProgress,
    Stack
} from '@mui/material';
import axios from 'axios';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const MetricCard = ({ title, value, icon, color }) => (
    <Paper sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2, flex: 1, boxShadow: '0px 4px 20px rgba(0,0,0,0.03)' }}>
        <Avatar variant="rounded" sx={{ bgcolor: `${color}.light`, color: `${color}.main`, width: 48, height: 48 }}>
            {icon}
        </Avatar>
        <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>{title}</Typography>
            <Typography variant="h5" fontWeight={700}>{value}</Typography>
        </Box>
    </Paper>
);

const DataMonitor = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [orders, setOrders] = useState([]);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [ordersRes, partnersRes] = await Promise.all([
                    axios.get('/odata/v4/CatalogService/PurchaseOrders'),
                    axios.get('/odata/v4/CatalogService/BusinessPartners')
                ]);
                setOrders(ordersRes.data.value || []);
                setPartners(partnersRes.data.value || []);
            } catch (err) {
                setError("Erreur de connexion au service SAP OData.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalAmount = orders.reduce((sum, o) => sum + (o.TotalAmount || 0), 0);
    const approvedCount = orders.filter(o => o.Status === 'Approved').length;

    return (
        <Box>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, letterSpacing: '-1px' }}>
                        Aperçu ERP
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Données temps réel de S/4HANA
                    </Typography>
                </Box>
                <MetricCard title="Total Commandes" value={`${totalAmount.toLocaleString()} MAD`} icon={<MonetizationOnOutlinedIcon />} color="primary" />
                <MetricCard title="Statut Approuvé" value={approvedCount} icon={<TrendingUpIcon />} color="success" />
            </Stack>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <Tabs
                    value={tabIndex}
                    onChange={(e, v) => setTabIndex(v)}
                    indicatorColor="primary"
                    textColor="primary"
                    sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1 }}
                >
                    <Tab icon={<ShoppingBagOutlinedIcon />} iconPosition="start" label="Commandes" sx={{ minHeight: 60, textTransform: 'none', fontSize: '1rem' }} />
                    <Tab icon={<BusinessIcon />} iconPosition="start" label="Fournisseurs" sx={{ minHeight: 60, textTransform: 'none', fontSize: '1rem' }} />
                </Tabs>

                {loading && <LinearProgress />}

                <Box sx={{ p: 0 }}>
                    <Fade in={!loading} timeout={500}>
                        <Box>
                            {tabIndex === 0 && (
                                <TableContainer>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>ID</TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Date</TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }} align="right">Montant</TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Statut</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((row) => (
                                                <TableRow key={row.ID} hover sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: 'background-color 0.2s' }}>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 600, color: 'primary.main' }}>#{row.ID}</TableCell>
                                                    <TableCell>{row.OrderDate}</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 600 }}>{row.TotalAmount} {row.Currency}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={row.Status}
                                                            size="small"
                                                            sx={{
                                                                fontWeight: 600,
                                                                borderRadius: 2,
                                                                bgcolor: row.Status === 'Approved' ? 'success.light' : row.Status === 'Rejected' ? 'error.light' : 'warning.light',
                                                                color: row.Status === 'Approved' ? 'success.dark' : row.Status === 'Rejected' ? 'error.dark' : 'warning.dark'
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}

                            {tabIndex === 1 && (
                                <TableContainer>
                                    <Table sx={{ minWidth: 650 }}>
                                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>ID</TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Entreprise</TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Région</TableCell>
                                                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Contact</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {partners.map((row) => (
                                                <TableRow key={row.ID} hover>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>{row.ID}</TableCell>
                                                    <TableCell>
                                                        <Stack direction="row" alignItems="center" spacing={1.5}>
                                                            <Avatar variant="rounded" sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'primary.light' }}>{row.Name[0]}</Avatar>
                                                            <Typography variant="body2" fontWeight={500}>{row.Name}</Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell>{row.Region}</TableCell>
                                                    <TableCell sx={{ color: 'text.secondary' }}>{row.Email}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Box>
                    </Fade>
                </Box>
            </Paper>
        </Box>
    );
};

export default DataMonitor;
