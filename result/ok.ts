import { Result } from ".";

export const ok = <T>(value: T) => new Result<T, never>("ok", value)
