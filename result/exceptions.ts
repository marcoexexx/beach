class UnwrapException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export function unwrap_failed<E>(msg: string, err: E): never {
  throw new UnwrapException(`${msg}: ${err}`);
}
