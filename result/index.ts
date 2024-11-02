import { Err } from "./err";
import { unwrap_failed } from "./exceptions";
import { Ok } from "./ok";

export * from "./err";
export * from "./ok";

export interface ToString {
  toString(): string;
}

export class Result<T, E extends ToString> {
  _type: "ok" | "err";
  value: T | E;

  constructor(type: "ok" | "err", value: T | E) {
    this._type = type;
    this.value = value;
  }
  
  [Symbol.iterator]() {
    let value = this.value;
    let _type = this._type;
    let iter = false;
    
    return {
      next() {
        if (_type === "ok" && !iter) {
          iter = true;
          return { value, done: false }
        } else {
          return { done: true }
        }
      }
    }
  }

  static try<Args extends any[], ReturnType>(fn: (...args: Args) => ReturnType) {
    return function(...args: Args): Result<ReturnType, Error> {
      try {
        let func = fn(...args);
        return Ok(func);
      } catch (e: any) {
        return Err(e);
      }
    };
  }

  static try_async<Args extends any[], ReturnType>(fn: (...args: Args) => Promise<ReturnType>) {
    return async function(...args: Args): Promise<Result<ReturnType, Error>> {
      try {
        let func = await fn(...args);
        return Ok(func);
      } catch (e: any) {
        return Err(e);
      }
    };
  }

  is_err() {
    return this._type === "err";
  }

  is_err_and(f: (x: T) => boolean): boolean {
    switch (this._type) {
      case "ok":
        return false;
      case "err":
        return f(this.value as T);
    }
  }

  is_ok() {
    return this._type === "ok";
  }

  is_ok_and(f: (x: T) => boolean): boolean {
    switch (this._type) {
      case "err":
        return false;
      case "ok":
        return f(this.value as T);
    }
  }

  ok(): T | undefined {
    if (this.value && this.is_ok()) return this.value as T;
    return undefined;
  }

  ok_or(x: E): Result<Exclude<T, undefined>, E> {
    if (this._type === "ok" && !this.value) return Err(x);
    return Ok(this.value as Exclude<T, undefined>);
  }

  err(): E | undefined {
    if (this.value && this.is_err()) return this.value as E;
    return undefined;
  }

  map<U extends ToString>(op: (x: T) => U): Result<U, E> {
    switch (this._type) {
      case "ok":
        return Ok(op(this.value as T));
      case "err":
        return Err(this.value as E);
    }
  }

  map_or<U>(default_: U, f: (x: T) => U): U {
    switch (this._type) {
      case "ok":
        return f(this.value as T);
      case "err":
        return default_;
    }
  }

  map_or_else<U>(default_: (err: E) => U, f: (x: T) => U): U {
    switch (this._type) {
      case "ok":
        return f(this.value as T);
      case "err":
        return default_(this.value as E);
    }
  }

  map_err<U extends ToString>(op: (err: E) => U): Result<T, U> {
    switch (this._type) {
      case "ok":
        return Ok(this.value as T);
      case "err":
        return Err(op(this.value as E));
    }
  }

  and<U extends ToString>(res: Result<U, E>): Result<U, E> {
    switch (this._type) {
      case "ok":
        return res;
      case "err":
        return Err(this.value as E);
    }
  }

  and_then<U extends ToString>(op: (x: T) => Result<U, E>): Result<U, E> {
    switch (this._type) {
      case "ok":
        return op(this.value as T);
      case "err":
        return Err(this.value as E);
    }
  }

  or<U extends ToString>(res: Result<T, U>): Result<T, U> {
    switch (this._type) {
      case "ok":
        return Ok(this.value as T);
      case "err":
        return res;
    }
  }

  or_else<U extends ToString>(op: (err: E) => Result<T, U>): Result<T, U> {
    switch (this._type) {
      case "ok":
        return Ok(this.value as T);
      case "err":
        return op(this.value as E);
    }
  }

  expect(msg: string): T {
    switch (this._type) {
      case "ok":
        return this.value as T;
      case "err":
        unwrap_failed(msg, this.value as E);
    }
  }

  expect_err(msg: string): E {
    switch (this._type) {
      case "ok":
        unwrap_failed(msg, this.value as T);
      case "err":
        return this.value as E;
    }
  }

  unwrap(): T {
    switch (this._type) {
      case "ok":
        return this.value as T;
      case "err":
        unwrap_failed("called `Result::unwrap()` on an `Err` value", this.value as E);
    }
  }

  unwrap_or(default_: T): T {
    switch (this._type) {
      case "ok":
        return this.value as T;
      case "err":
        return default_;
    }
  }
  unwrap_or_else(op: (err: E) => T): T {
    switch (this._type) {
      case "ok":
        return this.value as T;
      case "err":
        return op(this.value as E);
    }
  }

  unwrap_err(): E {
    switch (this._type) {
      case "ok":
        unwrap_failed("called `Result::unwrap_err()` on an `Ok` value", this.value as T);
      case "err":
        return this.value as E;
    }
  }

  ok_or_throw(): T {
    if (this.is_ok()) return this.value as T;
    throw this.value;
  }
}
