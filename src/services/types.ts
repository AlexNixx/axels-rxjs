export type Todo = {
    id: number;
    title: string;
    isCompleted: boolean;
};

export type Filter = FilterState;

export enum FilterState {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETED = 'completed'
}
