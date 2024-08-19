import { Result, ToString } from ".";

export const Err = <T, E extends ToString>(value: E) => new Result<T, E>("err", value);
