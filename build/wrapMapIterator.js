export function wrapMapIterator(original, valueFn) {
    const array = Array.from(original);
    const wrapped = {
        [Symbol.dispose]() {
            array.length = 0;
        },
        [Symbol.iterator]() {
            return this;
        },
        next: () => {
            while (array.length) {
                const { value, skip } = valueFn(array.shift());
                if (!skip) {
                    return { value, done: false };
                }
            }
            return { value: undefined, done: true };
        }
        // return?(value?: TReturn): IteratorResult<T, TReturn>;
        // throw?(e?: any): IteratorResult<T, TReturn>;
    };
    return wrapped;
}
