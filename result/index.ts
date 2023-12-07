import { Err } from './err'
import { Ok } from './ok'

export * from './ok'
export * from './err'
export * from './as_result'

export type Result<T, E> =
  | Ok<T>
  | Err<E>


