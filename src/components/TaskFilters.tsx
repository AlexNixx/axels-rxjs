import { useState } from 'react';
import type { ReactNode, SyntheticEvent } from 'react';

import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChecklistIcon from '@mui/icons-material/Checklist';

import { todoService, FilterState } from 'services';
import type { Filter } from 'services';

const filterConfig: {
    label: string;
    value: Filter;
    icon: ReactNode;
}[] = [
    {
        label: 'All',
        value: FilterState.ALL,
        icon: <ListIcon />
    },
    {
        label: 'Active',
        value: FilterState.ACTIVE,
        icon: <AddTaskIcon />
    },
    {
        label: 'Completed',
        value: FilterState.COMPLETED,
        icon: <ChecklistIcon />
    }
];

export const TaskFilters = () => {
    const [value, setValue] = useState<number>(0);

    const handleSetFilter = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
        todoService.filter(filterConfig[newValue].value);
    };

    return (
        <Paper sx={{ p: 1 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleSetFilter}
            >
                {filterConfig.map(item => (
                    <BottomNavigationAction
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    );
};
