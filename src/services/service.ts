import { BehaviorSubject, combineLatest, map, Subject } from 'rxjs';
import { Filter, FilterState, Todo } from './types';

const defaultTasks: Todo[] = [];

export const todoList$ = new BehaviorSubject<Todo[]>(defaultTasks);

const insert$ = new Subject<Todo>();
const delete$ = new Subject<Todo['id']>();
const toggle$ = new Subject<Todo['id']>();
const update$ = new Subject<Todo>();
const filter$ = new BehaviorSubject<Filter>(FilterState.ALL);

const todos$ = combineLatest([todoList$, filter$]).pipe(
    map(([todos, filter]) => {
        if (filter === FilterState.ACTIVE) {
            return todos.filter(todo => todo.isCompleted !== true);
        }
        if (filter === FilterState.COMPLETED) {
            return todos.filter(todo => todo.isCompleted !== false);
        }

        return todos;
    })
);

insert$.pipe(map(todo => [...todoList$.value, todo])).subscribe(todoList$);

delete$
    .pipe(map(id => todoList$.value.filter(todo => todo.id !== id)))
    .subscribe(todoList$);

toggle$
    .pipe(
        map(id =>
            todoList$.value.map(todo =>
                todo.id === id
                    ? { ...todo, isCompleted: !todo.isCompleted }
                    : todo
            )
        )
    )
    .subscribe(todoList$);

update$
    .pipe(
        map(updatedTodo =>
            todoList$.value.map(todo =>
                todo.id === updatedTodo.id
                    ? { ...todo, title: updatedTodo.title }
                    : todo
            )
        )
    )
    .subscribe(todoList$);

export const todoService = {
    get: () => todos$,
    add: (title: Todo['title']) => {
        insert$.next({
            id: Date.now(),
            title,
            isCompleted: false
        });
    },
    delete: (id: Todo['id']) => delete$.next(id),
    toggle: (id: Todo['id']) => toggle$.next(id),
    update: (todo: Todo) => update$.next(todo),
    filter: (filter: Filter) => filter$.next(filter)
};
