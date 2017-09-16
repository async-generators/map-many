export default async function* <T, R>(
  source: AsyncIterable<T> | Iterable<T>,
  selector: (value: T, index: number) => AsyncIterable<R> | Iterable<R>
): AsyncIterable<R> {

  const It = source[Symbol.asyncIterator] || source[Symbol.iterator];
  if (typeof It !== "function")
    throw Error("source parameter is not iterable");
  let index = 0;
  let it: AsyncIterator<T> = It.call(source);

  while (true) {
    const { done, value } = await it.next();
    if (done) { return; }
    yield * selector(value, index++)
  }
}