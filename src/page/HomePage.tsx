import { Layout } from './Layout';

import { CreateTask } from 'components/CreateTask';
import { TaskList } from 'components/TaskList';

export const HomePage = () => (
    <Layout>
        <CreateTask />
        <TaskList />
    </Layout>
);
