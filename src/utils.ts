export function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}



export function scrambleArray(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j]!, array[i]!];
    }
    return array;
}