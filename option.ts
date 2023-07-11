type Arg<T> = 
  | { _type: "some", value: T }
  | { _type: "none" }

class OptionIml<T> {
  private constructor(private arg: Arg<T>) {}

  static Some<U>(arg: U) {
    return new OptionIml({ _type: "some", value: arg }) as Option<U>;
  }

  static None<U>() {
    return new OptionIml({ _type: "none" }) as Option<U>;
  }

  is_some() {
    return this.arg._type === "some"
  }
  is_some_and(fn: (x: T) => boolean) {
    if (this.arg._type === "some") return fn(this.arg.value);
    return false
  }
  is_none() { return this.arg._type === "none" }
  is_none_and(fn: () => boolean) {
    if (this.arg._type === "none") return fn();
    return false
  }
  expect(msg: string) {
    if (this.arg._type === "some") return this.arg.value;
    throw new Error(`${msg}: "None"`);
  }
  unwrap() {
    if (this.arg._type === "some") return this.arg.value;
    throw new Error(`called \`Option unwrap()\` on an \`None\` value`)
  }
  unwrap_or(default_: T) {
    if (this.arg._type === "some") return this.arg.value;
    return default_;
  }
  unwrap_or_else(fn: () => T) {
    if (this.arg._type === "none") return fn();
    return this.arg.value
  }
  toString() {
    return "value" in this.arg ? JSON.stringify(this.arg.value) : undefined
  }
}

interface Some<T> extends OptionIml<T> { readonly _type: "some", value: T }
interface None<T> extends OptionIml<T> { readonly _type: "none" }

export type Option<T> = Some<T> | None<T>

interface OptionConstructor {
  Some: typeof OptionIml.Some,
  None: typeof OptionIml.None
}

export const Some = OptionIml.Some;
export const None = OptionIml.None;

export const Option = OptionIml as OptionConstructor;
export default Option;
