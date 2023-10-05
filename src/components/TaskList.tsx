import { List } from '@mui/material';

import { TaskItem } from './TaskItem';

import { todoService, useObservable } from 'services';
import type { Todo } from 'services';

export const TaskList = () => {
    const todos = useObservable<Todo[]>(todoService.get(), []);

    return (
        <List sx={{ maxHeight: '55vh', overflow: 'auto' }}>
            {todos?.map(todo => (
                <TaskItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    isCompleted={todo.isCompleted}
                />
            ))}
        </List>
    );
};
