import { IResult } from "./type";

export class Err<E> implements IResult<never, E> {
  _type: "ok" | "err" = "err"
  constructor(public value: E) {}

  is_err() {
    return this._type === "err"
  }

  is_ok() {
    return this._type === "ok"
  }

  ok() {
    return undefined
  }

  err() {
    if (this.value) return this.value
    return undefined
  }
}


export const err = <T>(value: T) => new Err(value)
