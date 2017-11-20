export function assert(ok: boolean, msg: string | Error) {
  if (!ok) {
    if (typeof msg === "string") {
      throw new Error(msg);
    } else {
      throw msg;
    }
  }
}
