import { useState } from 'react';

import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { DeleteTask } from './DeleteTask';
import { EditTask } from './EditTask';

import { todoService } from 'services';
import type { Todo } from 'services';

export const TaskItem = (todo: Todo) => {
    const { id, title, isCompleted } = todo;

    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const handleCloseForm = () => setIsFormVisible(!isFormVisible);

    return (
        <ListItem
            key={id}
            disablePadding
            secondaryAction={
                <Stack direction='row' spacing={1}>
                    <IconButton edge='end' onClick={handleCloseForm}>
                        {isFormVisible ? <CloseIcon /> : <EditIcon />}
                    </IconButton>
                    <DeleteTask taskId={id} />
                </Stack>
            }
        >
            <ListItemButton>
                <ListItemIcon>
                    <Checkbox
                        edge='start'
                        checked={isCompleted}
                        onChange={() => todoService.toggle(id)}
                    />
                </ListItemIcon>
                {isFormVisible ? (
                    <EditTask todo={todo} onClose={handleCloseForm} />
                ) : (
                    <ListItemText primary={title} />
                )}
            </ListItemButton>
        </ListItem>
    );
};
