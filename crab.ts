import Option, { None, Some } from './option';
import Result, { Err, Ok } from './result'


type MyErrorEnum = 
  | "NotFound404"
  | "ServerError500"


function calculate(div: number): Result<number, string> {
  if (div === 0) return Err("not allowed");
  return Ok(12/div);
}


async function promise(err: boolean): Promise<Result<string, MyErrorEnum>> {
  const err_data: Option<string> = await Promise.reject().then(d => Some(d)).catch(_ => None())
  const ok_data: Option<string> = await Promise.resolve("hello, world").then(d => Some(d)).catch(_ => None())

  if (err && err_data.is_some()) return Ok(err_data.unwrap());
  if (!err && ok_data.is_some()) return Ok(ok_data.unwrap());
  return Err("ServerError500");
}


(async function main() {
  const data = calculate(0).is_ok();
  const name = Some(20).unwrap();

  console.log({ data, name });
  const ok_hello = (await promise(false)).unwrap();
  console.log({ ok_hello });
  const err_hello = (await promise(true)).unwrap();
  console.log({ err_hello });
})()
