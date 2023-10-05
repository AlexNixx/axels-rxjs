import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { todoService } from 'services';

interface DeleteTaskProps {
    taskId: number;
}

export const DeleteTask = ({ taskId }: DeleteTaskProps) => {
    const handleDelete = () => {
        todoService.delete(taskId);
    };

    return (
        <IconButton edge='end' onClick={handleDelete}>
            <DeleteIcon />
        </IconButton>
    );
};
