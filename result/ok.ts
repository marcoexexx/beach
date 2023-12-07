import { IResult } from "./type";

export class Ok<T> implements IResult<T, never> {
  _type: "ok" | "err" = "ok";
  constructor(public value: T) {}

  is_err() {
    return this._type === "err"
  }

  is_ok() {
    return this._type === "ok"
  }

  ok() {
    if (this.value) return this.value
    return undefined
  }

  err() {
    return undefined
  }
}


export const ok = <T>(value: T) => new Ok(value)
