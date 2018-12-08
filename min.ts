export function minimalBy<T>(arr: Iterable<T>, f: (item: T) => number): [T[], number] {
  let currentMin = Number.MAX_SAFE_INTEGER;
  let smallestItems: T[] = [];
  for (let item of arr) {
    let newValue = f(item);
    if (newValue < currentMin) {
      currentMin = newValue;
      smallestItems = [item];
    } else if (newValue === currentMin) {
      smallestItems.push(item);
    }
  }
  return [smallestItems, currentMin];
}

export function maximalBy<T>(arr: Iterable<T>, f: (item: T) => number): [T[], number] {
  let [items, value] = minimalBy(arr, (item) => - f(item));
  return [items, -value];
}
