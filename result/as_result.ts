import { Result, ToString, ok } from "."
import { err } from "./err"

export function as_result<Args extends any[], ReturnType extends ToString>(fn: (...args: Args) => ReturnType) {
  return function(...args: Args): Result<ReturnType, Error> {
    try {
      const func = fn(...args)
      return ok(func)
    } catch (e: any) {
      return err(e)
    }
  }
}
