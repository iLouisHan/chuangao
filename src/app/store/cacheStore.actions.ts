import { Action } from '@ngrx/store';

export const SAVELOGIN = 'Save Login';
export class SaveLogin implements Action {
  readonly type = SAVELOGIN;

  constructor(public payload: Object) {}
}

export const SAVEGREENINFO = 'Save OrgInfo';
export class SaveGreenInfo implements Action {
  readonly type = SAVEGREENINFO;

  constructor(public payload: Object) {}
}

export type Actions =
| SaveLogin
| SaveGreenInfo;
