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


async function fetch_data_async(key: string): Promise<Result<string, CustomError>> {
  const data = {
    cat: "Tom",
    mouse: "Jerry"
  }[key]

  return new Promise((resolve, reject) => {
    if (!data) return reject(err(new CustomError()))
    return resolve(ok(data))
  })
}


const unsafe = as_result((x: number) => {
  if (x) return x
  throw new Error("Not be zero!")
})


const x = unsafe(0)

console.log(x.is_err())
console.log(fetch_data("dog").is_err())


const data_async = fetch_data_async("dog")
  .then(v => console.log(v.is_err()))
