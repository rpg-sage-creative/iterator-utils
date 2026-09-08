export function wrapMapIterator(original, valueFn) {
    const array = Array.from(original);
    return Iterator.from({
        next: () => {
            while (array.length) {
                const { value, skip } = valueFn(array.shift());
                if (!skip) {
                    return { value, done: false };
                }
            }
            return { value: undefined, done: true };
        }
    });
}
