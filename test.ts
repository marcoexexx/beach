import { Result, as_result, err, ok } from "./result"


class CustomError extends Error {
  constructor() {
    super("data not found")
    this.name = "Not Found"
  }
}


function fetch_data(key: string): Result<string, CustomError> {
  const data = {
    cat: "Tom",
    mouse: "Jerry"
  }[key]
  if (!data) return err(new CustomError())
  return ok(data)
}

class AsyncResult<T, E> extends Result<T, E> {
  match({ Ok, Err }: { Ok: <U>(value: T) => U, Err: (err: E) => void }) {
  }
}

const asyncOk = <T>(value: T) => new AsyncResult<T, never>("ok" ,value)
const asyncErr = <E>(value: E) => new AsyncResult<never, E>("err" ,value)


function fetch_data_async(key: string) {
  const data = {
    cat: "Tom",
    mouse: "Jerry"
  }[key]

  return !data ? asyncErr(new CustomError()) : asyncOk(data)
}


const unsafe = as_result((x: number) => {
  if (x) return x
  throw new Error("Not be zero!")
})


const x = unsafe(0)

console.log(x.is_err())
console.log(fetch_data("dog").is_err())

async function main() {
  const data = fetch_data_async("dog").match({
    Ok: (v) => 
  })
  console.log(data)
}
main()
