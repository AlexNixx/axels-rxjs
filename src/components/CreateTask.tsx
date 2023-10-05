import { SyntheticEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import { todoService } from 'services';

export const CreateTask = () => {
    const [title, setTitle] = useState('');

    const handleCreate = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!title.trim().length) return;

        todoService.add(title);
        setTitle('');
    };

    return (
        <Box
            component='form'
            onSubmit={handleCreate}
            autoComplete='off'
            sx={{ display: 'flex', gap: 2 }}
        >
            <TextField
                label='Create a new todo...'
                value={title}
                onChange={event => setTitle(event.target.value)}
                fullWidth
            />
            <Button type='submit' variant='contained'>
                Add
            </Button>
        </Box>
    );
};
