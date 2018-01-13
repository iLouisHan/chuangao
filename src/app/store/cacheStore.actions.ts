import { Action } from '@ngrx/store';

export const SAVELOGIN = 'Save Login';
export class SaveLogin implements Action {
  readonly type = SAVELOGIN;

  constructor(public payload: Object) {}
}

export const SAVEORGINFO = 'Save OrgInfo';
export class SaveOrgInfo implements Action {
  readonly type = SAVEORGINFO;

  constructor(public payload: Object) {}
}

export type Actions =
| SaveLogin
| SaveOrgInfo;
