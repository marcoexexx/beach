export interface IResult<T, E> {
  _type: "ok" | "err"
  value: T | E

  is_err: () => boolean
  is_ok: () => boolean
  ok: () => T | undefined
  err: () => E | undefined
}

