import { Types } from '../../models/actionTypes/stacksTypes';
import {
  CreateDraftStack,
  CreateDraftStackPayload,
  FetchStackById,
  FetchStackByIdPayload,
  PublishDraftStack,
  PublishDraftStackPayload,
  FetchStackSuccess,
  FetchStackSuccessPayload,
  StackFailure,
  StackErrorPayload,
} from '../../models/types/stacksTypes';

// fetchStackById, createDraftStack, publishDraftStack => return stack object
// patchStack, bindQuestionCardToStack, unbind => no return
// deleteStackById => 205 reset content successful

export const fetchStackById = (
  payload: FetchStackByIdPayload
): FetchStackById => ({
  type: Types.FETCH_STACK_REQUEST,
  payload,
});

export const createDraftStack = (
  payload: CreateDraftStackPayload
): CreateDraftStack => ({
  type: Types.CREATE_DRAFT_STACK_REQUEST,
  payload,
});

// export const patchStackById = (payload: any) => ({

// });

// export const deleteStackById = (payload: any) => ({

// });

// export const bindQuestionCardToStack = (payload: any) => ({

// });

// export const unbindQuestionCardFromStack = (payload: any) => ({

// });

export const publishDraftStack = (
  payload: PublishDraftStackPayload
): PublishDraftStack => ({
  type: Types.PUBLISH_DRAFT_STACK_REQUEST,
  payload,
});

export const fetchStackSuccess = (
  payload: FetchStackSuccessPayload
): FetchStackSuccess => ({
  type: Types.GET_STACK_SUCCESS,
  payload,
});

export const stackError = (payload: StackErrorPayload): StackFailure => ({
  type: Types.STACK_ERROR,
  payload,
});
