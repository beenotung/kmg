import {enum_i2s, enum_s2i} from '../../../lib/tslib/src/enum';

export enum Role {
  student, tutor
}

export type RoleType = 'student' | 'tutor';
export const Role_Student: 'student' = 'student';
export const Role_Tutor: 'tutor' = 'tutor';

export function roleType_to_role(role: RoleType): Role {
  return enum_s2i(Role, role);
}

export function role_to_roleType(role: Role): RoleType {
  return enum_i2s(Role, role);
}

export function opposite_role_type(role: RoleType): RoleType {
  return role === Role_Student ? Role_Tutor : Role_Student;
}

export function opposite_role(role: Role): Role {
  return role === Role.student ? Role.tutor : Role.student;
}
