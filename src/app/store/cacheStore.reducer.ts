import { Action, ActionReducer } from '@ngrx/store';
import * as collection from './cacheStore.actions';

export function LoginReducer(
  state: any,
  action: collection.Actions
) {
  switch (action.type) {
    case collection.SAVELOGIN: {
      state = action.payload;
      return state;
    }
    default: {
      return state;
    }
  }
}

export function GreenReducer(
  state: any,
  action: collection.Actions
) {
  switch (action.type) {
    case collection.SAVEGREENINFO: {
      state = action.payload;
      return state;
    }
    default: {
      return state;
    }
  }
}
