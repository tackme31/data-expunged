type ChainedWhen<T, R> = {
  on: <A>(v: T, fn: () => A) => ChainedWhen<T, R | A>;
  otherwise: <A>(fn: () => A) => R | A;
};

const match = <T, R>(val: any): ChainedWhen<T, R> => ({
  on: <A>(v: T, fn: () => A) => match<T, R | A>(val),
  otherwise: <A>(fn: () => A): A | R => val,
});

const chain = <T, R>(val: T): ChainedWhen<T, R> => ({
  on: <A>(v: T, fn: () => A) =>
    val === v ? match(fn()) : chain<T, A | R>(val),
  otherwise: <A>(fn: () => A) => fn(),
});

export const when = <T>(val: T) => ({
  on: <A>(v: T, fn: () => A) =>
    val === v ? match<T, A>(fn()) : chain<T, A>(val),
});