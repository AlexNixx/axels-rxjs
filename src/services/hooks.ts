import { useEffect, useState } from 'react';

import { Observable } from 'rxjs';

export function useSubscription<T>(
    source$: Observable<T>,
    nextHandler: (value: T) => void,
    errorHandler?: (err: unknown) => void
) {
    useEffect(() => {
        const subs = source$.subscribe({
            next: nextHandler,
            error: errorHandler
        });

        return () => subs.unsubscribe();
    }, [source$, nextHandler, errorHandler]);
}

export function useObservable<T>(
    source$: Observable<T>,
    initialState: T,
    errorHandler?: (err: unknown) => void
): T {
    const [value, setValue] = useState<T>(initialState);

    useSubscription(source$, setValue, errorHandler);

    return value;
}
