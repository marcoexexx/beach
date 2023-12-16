import { ToString } from "."

class UnwrapException extends Error {
  constructor(msg: string) {
    super(msg)
  }
}

export function unwrap_failed<E extends ToString>(msg: string, err: E): never {
  throw new UnwrapException(`${msg}: ${err.toString()}`)
}
