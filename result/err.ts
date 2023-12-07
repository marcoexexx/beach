import { Result } from ".";

export const err = <E>(value: E) => new Result<never, E>("err", value)
