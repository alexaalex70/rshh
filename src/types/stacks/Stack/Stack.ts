import { QuestionSet } from '../..';
import { StackType } from './StackType';

export interface Stack {
  id: string;
  stackType: StackType;
  createdBy: {
    id: string;
    profileType: string;
    roles: Array<string>;
    displayName: string;
    avatarInitials: string;
    groupId: string | null;
    programme: string;
  };
  updatedAt: string;
  updatedBy: {
    id: string;
    profileType: string;
    roles: Array<string>;
    displayName: string;
    avatarInitials: string;
    groupId: string | null;
    programme: string;
  };
  channelId: string;
  draft: boolean;
  systemMessageType: string | null;
  message: {
    body: string;
    attachments: [];
    urls: [];
  };
  cards: Array<QuestionSet>;
  createdAt: string;
}
