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

  ok() {
    if (this.value) return this.value
    return undefined
  }

  err() {
    if (this.value) return this.value
    return undefined
  }
}
