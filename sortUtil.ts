export function sortOn<T>(...accessors: ((arg0: T) => number)[]) {
  return (a: T, b: T) => {
    for (let accessor of accessors) {
      let diff = accessor(a) - accessor(b);
      if(diff !== 0) return diff;
    }
    return 0;
  }
}