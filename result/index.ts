export * from './ok'
export * from './err'
export * from './as_result'

export class Result<T, E> {
  constructor(public _type: "ok" | "err", public value: T|E) {}

  is_err() {
    return this._type === "err"
  }

  is_ok() {
    return this._type === "ok"
  }

  ok(): T | undefined {
    if (this.value) return this.value as T
    return undefined
  }

  err(): E | undefined {
    if (this.value) return this.value as E
    return undefined
  }
}
