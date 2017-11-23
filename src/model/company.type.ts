import {enum_only_string} from "@beenotung/tslib";

export enum CompanyType {
  Publishing,
  MediaFirm,
  ITCompany,
  Education,
}

enum_only_string(CompanyType);
