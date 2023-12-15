import { err } from './err'
import { ok } from './ok'

export * from './ok'
export * from './err'
export * from './as_result'

export class Result<T, E> {
  _type: "ok" | "err"
  value: T | E

  constructor(type: "ok" | "err",value: T|E) {
    this._type = type
    this.value = value
  }

  is_err() {
    return this._type === "err"
  }

  is_err_and(f: (x: T) => boolean): boolean {
    switch (this._type) {
      case "ok": return false
      case "err": return f(this.value as T)
    }
  }

  is_ok() {
    return this._type === "ok"
  }

  is_ok_and(f: (x: T) => boolean): boolean {
    switch (this._type) {
      case "err": return false
      case "ok": return f(this.value as T)
    }
  }

  ok(): T | undefined {
    if (this.value) return this.value as T
    return undefined
  }

  err(): E | undefined {
    if (this.value) return this.value as E
    return undefined
  }

  map<U>(op: (x: T) => U): Result<U, E> {
    switch (this._type) {
      case "ok": return ok(op(this.value as T))
      case "err": return err(this.value as E)
    }
  }

  map_or<U>(default_: U, f: (x: T) => U): U {
    switch (this._type) {
      case "ok": return f(this.value as T)
      case "err": return default_
    }
  }
}
