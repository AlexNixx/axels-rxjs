import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

import { todoService } from 'services';
import type { Todo } from 'services';

interface EditTaskProps {
    todo: Todo;
    onClose: () => void;
}

export const EditTask = ({ todo, onClose }: EditTaskProps) => {
    const [value, setValue] = useState(todo.title);

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleUpdate = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!value.trim().length) return;

        todoService.update({ ...todo, title: value });

        onClose();
    };

    return (
        <Box
            component='form'
            onSubmit={handleUpdate}
            sx={{ display: 'flex', gap: 1 }}
        >
            <TextField
                defaultValue={value}
                onChange={handleChangeTitle}
                size='small'
            />
            <Button type='submit' variant={'outlined'} size='small'>
                Update
            </Button>
        </Box>
    );
};
