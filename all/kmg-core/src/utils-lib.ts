/**
 * to be extracted into lib
 * */
import {Enum, enum_values, new_counter, Random} from "@beenotung/tslib";
import {compare_number} from "@beenotung/tslib/number";

export function assert(ok: boolean, msg: string | Error) {
  if (!ok) {
    if (typeof msg === "string") {
      throw new Error(msg);
    } else {
      throw msg;
    }
  }
}

export interface EvenRandom<A> {
  next: () => A;
}

/**
 * .next => [0 .. size-1]
 * */
export function new_even_random_int(size: number): EvenRandom<number> {
  const counter = new_counter(Random.nextInt(size));
  return {
    next: () => counter.next() % size
  };
}

export function new_even_random_enum<E extends Enum>(e: E): EvenRandom<E> {
  const xs = enum_values(e);
  const n = xs.length;
  const counter = new_counter(n);
  return {
    next: () => xs[counter.next() % n]
  };
}

type Order<T> = [number, T];

/**
 * this is not done in-place
 * */
export function randomOrder<A>(xs: A[]): A[] {
  const orders: Array<Order<A>> = xs.map(a => [Math.random(), a]as Order<A>);
  orders.sort(([a], [b]) => compare_number(a, b));
  return orders.map(([_, a]) => a);
}

export function randomOrderInplace<A>(xs: A[]): A[] {
  const orders = new Map<A, number>();
  xs.forEach(x => orders.set(x, Math.random()));
  xs.sort((a, b) => compare_number(orders.get(a), orders.get(b)));
  return xs;
}

export function zipArray<A, B>(as: A[], bs: B[]): Array<[A, B]> {
  const n = Math.min(as.length, bs.length);
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = [as[i], bs[i]];
  }
  return res;
}
