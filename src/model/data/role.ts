import {enum_set_string} from "@beenotung/tslib/src/enum";

export enum Role {
  Admin, General, Guest
}

enum_set_string(Role);
