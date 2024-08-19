import { Result } from "./result";

const ErrorKind = {
  Throwable: "Throwable",
  AsyncThrowable: "AsyncThrowable",
} as const;
type ErrorKind = typeof ErrorKind[keyof typeof ErrorKind];

class AppError extends Error {
  constructor(public kind: ErrorKind, message?: string) {
    super(message);
    this.message = `${this.kind}${this.message && `: ${this.message}`}`;
  }
}

function throwable(_arg1: number): number {
  throw new AppError(ErrorKind.Throwable);
}

const safe_throwable = Result.try(throwable);

async function throwable_async(_arg1: string, _arg2: number): Promise<string> {
  return Promise.reject(new AppError(ErrorKind.AsyncThrowable));
}

const async_safe_throwable = Result.try_async(throwable_async);

// START MAIN FUNCTION
(async function main() {
  const _maked_safe_throwable = safe_throwable(0);
  const _maked_safe_async_throwable = await async_safe_throwable("a", 0);

  console.debug(_maked_safe_throwable.is_ok(), _maked_safe_async_throwable.is_ok());
})();
