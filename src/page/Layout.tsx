import { Container, Paper, Stack, Typography } from '@mui/material';
import { CssBaseline } from '@mui/material';

import type { ReactNode } from 'react';

import { TaskFilters } from 'components/TaskFilters';

interface TodoLayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: TodoLayoutProps) => (
    <Container maxWidth='sm' sx={{ p: 5 }}>
        <CssBaseline />
        <Stack direction='column' spacing={3}>
            <Typography variant='h5' textAlign='center'>
                TODO
            </Typography>

            <Paper sx={{ p: '2rem 2rem 1rem 2rem' }}>
                <Stack direction='column' spacing={1}>
                    {children}
                </Stack>
            </Paper>

            <TaskFilters />
        </Stack>
    </Container>
);
