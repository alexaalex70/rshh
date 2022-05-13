import { Types } from '../actionTypes/stacksTypes';
import { Stack } from '../../../types/stacks/Stack/Stack';

export interface StackState {
  stack: Stack | undefined;
  error: string | null;
}

export interface CreateDraftStackPayload {
  channelId: string;
}

export type CreateDraftStack = {
  type: Types.CREATE_DRAFT_STACK_REQUEST;
  payload: CreateDraftStackPayload;
};

export interface FetchStackByIdPayload {
  stackId: string;
}

export type FetchStackById = {
  type: Types.FETCH_STACK_REQUEST;
  payload: FetchStackByIdPayload;
};

export interface PublishDraftStackPayload {
  stackId: string;
}

export type PublishDraftStack = {
  type: Types.PUBLISH_DRAFT_STACK_REQUEST;
  payload: PublishDraftStackPayload;
};

export interface FetchStackSuccessPayload {
  stack: Stack;
}

export type FetchStackSuccess = {
  type: typeof Types.GET_STACK_SUCCESS;
  payload: FetchStackSuccessPayload;
};

export interface StackErrorPayload {
  error: string;
}

export type StackFailure = {
  type: typeof Types.STACK_ERROR;
  payload: StackErrorPayload;
};

export type StackActions =
  | CreateDraftStack
  | FetchStackById
  | PublishDraftStack
  | FetchStackSuccess
  | StackFailure;
