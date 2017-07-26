import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable";
import {Enum, enum_set_string} from "@beenotung/tslib/src/enum";

export enum CommonResult {
  ok
    , not_login
    , banned
    , unknown
    , not_impl
    , logical_error
}

enum_set_string(CommonResult);

export interface APIResponse<E extends number, A> {
  result_enum: Enum
  result_code: E | CommonResult
  reason?: any;
  data?: A;
}

export async function ok<A>(a_o_p: A | Observable<A> | Promise<A>): Promise<APIResponse<any, A>> {
  let a: A;
  if (typeof a_o_p === "object") {
    const o = <Observable<A>> <any> a_o_p;
    if (typeof o.toPromise === "function") {
      a = await o.toPromise();
    } else {
      a = await <A | Promise<A>>a_o_p;
    }
  }
  return {
    result_code: CommonResult.ok
    , result_enum: CommonResult
    , data: a
  };
}

export function isOK(res: APIResponse<any, any>): boolean {
  return res.result_enum == CommonResult && res.result_code == CommonResult.ok;
}

export function fail<Enum, Code extends number>(Enum: Enum, code: Code, reason?: any): APIResponse<Code, any> {
  return {
    result_code: code
    , result_enum: Enum
    , reason: reason || new Error()
  };
}

export async function extractData<Enum extends number, A>(o: Promise<APIResponse<Enum, A>>): Promise<A> {
  let is_error = true;
  try {
    const res: APIResponse<Enum, A> = await o;
    if (res.result_enum === CommonResult && res.result_code === CommonResult.ok) {
      return res.data;
    } else {
      is_error = false;
      throw res;
    }
  } catch (e) {
    let res: APIResponse<Enum, A>;
    if (is_error) {
      console.error("API failed", e);
      debugger;
      res = fail(CommonResult, CommonResult.unknown, e);
    } else {
      res = e;
    }
    if (res.result_enum == CommonResult && res.result_code == CommonResult.unknown) {
      /* TODO [later] sent Bug Report */
      debugger;
    }
    debugger;
    throw res;
  }
}
