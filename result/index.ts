import { Err } from "./err";
import { unwrap_failed } from "./excceptions";
import { Ok } from "./ok";

export * from "./err";
export * from "./ok";

export interface ToString {
  toString(): string;
}

export class Result<T extends ToString, E extends ToString> {
  _type: "ok" | "err";
  value: T | E;

  constructor(type: "ok" | "err", value: T | E) {
    this._type = type;
    this.value = value;
  }

  static try<Args extends any[], ReturnType extends ToString>(fn: (...args: Args) => ReturnType) {
    return function(...args: Args): Result<ReturnType, Error> {
      try {
        const func = fn(...args);
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
    if (this.value) return this.value as T;
    return undefined;
  }

  err(): E | undefined {
    if (this.value) return this.value as E;
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
}
