export type actionType = {
    type: string; payload: any;
  }

export const emptyActionType : actionType = { type: '', payload: {}};