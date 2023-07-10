import { None, Some } from "./option";

type Arg<T, E> = { _type: "err", value: E } | { _type: "ok", value: T }

class ResultImpl<T, E> {
  private constructor(private arg: Arg<T, E>) {}

  static Ok<T, E>(arg: T) {
    return new ResultImpl({ _type: "ok", value: arg }) as Result<T, E>;
  }

  static Err<T, E>(arg: E) {
    return new ResultImpl({ _type: "err", value: arg }) as Result<T, E>;
  }

  ok() {
    return this.arg._type === "ok" ? Some(this.arg.value) : None()
  }

  err() {
    return this.arg._type === "err" ? Some(this.arg.value) : None()
  }

  is_ok() {
    return this.arg._type === "ok"
  }
  
  is_err() {
    return this.arg._type === "err"
  }
  
  is_ok_and<U = T>(fn: (x: U|T) => boolean) {
    if (this.arg._type === "ok") return fn(this.arg.value);
    return false
  }

  is_err_and<U = E>(fn: (x: E|U) => boolean) {
    if (this.arg._type === "err") return fn(this.arg.value);
    return false
  }

  expect<U = E>(msg: string): T|U {
    if (this.arg._type === "ok") return this.arg.value;
    throw new Error(`${msg}: "${this.arg.value}"`)
  }
  
  unwrap<U = T>(): U|T {
    if (this.arg._type === "ok") return this.arg.value;
    throw new Error(`called \`Result unwrap()\` on an \`Err\` value: ${this.arg.value}`)
  }
  unwrap_or<U = T>(default_: U|T) {
    if (this.arg._type === "ok") return this.arg.value;
    return default_;
  }
  unwrap_or_else<U = T, N = E>(fn: (e: E|N) => U|T) {
    if (this.arg._type === "ok") return this.arg.value;
    return fn(this.arg.value);
  }
  toString() {
    return JSON.stringify(this.arg.value)
  }
}

interface Ok<T, E> extends ResultImpl<T, E> { readonly _type: "ok", value: T }

interface Err<T, E> extends ResultImpl<T, E> { readonly _type: "err", value: E }

export type Result<T, E> = Ok<T, E> | Err<T, E>;

interface ResultConstructor {
  Ok: typeof ResultImpl.Ok,
  Err: typeof ResultImpl.Err
}

export const Err = ResultImpl.Err;
export const Ok = ResultImpl.Ok;

export const Result = ResultImpl as ResultConstructor
export default Result;
