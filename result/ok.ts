import { Result, ToString } from ".";

export const Ok = <T, E extends ToString>(value: T) => new Result<T, E>("ok", value);
