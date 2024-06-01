import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
            }}
        >
            <Container>
                <Typography variant="body1">My sticky footer can be found here.</Typography>
                <Typography variant="body2" color="text.secondary">
                    © 2024 See-que-nce
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
