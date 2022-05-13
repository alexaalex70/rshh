import axios from 'axios';

const headers = { 'Content-Type': 'application/json' };

// TODO: create a stackType enum var
// TODO: create types in src/types/stacks
// TODO: var for API call string

export const createDraftStack = async (channelId: string) => {
  const response = await axios.post(
    'api/channel/1.0/stack',
    {
      stackType: 'MESSAGE_CLINICIAN_TO_MEMBER',
      channelId: channelId,
      message: {
        body: '',
      },
    },
    { headers }
  );

  // const data = await response.json();
  // return data

  return response.data;
};

export const getStacks = async (channelId: string) => {
  // this is for the demo and we only require a console.log
  const response = await axios.get(
    `api/channel/1.0/stack?channel_id=${channelId}`,
    { headers }
  );

  return response.data;
};

export const getStackById = async (stackId: string) => {
  const response = await axios.get(`api/channel/1.0/stack/${stackId}`, {
    headers,
  });

  return response.data;
};

export const patchStack = async (stackId: string, message: string) => {
  // const response ??
  await axios.patch(
    `api/channel/1.0/stack/${stackId}`,
    {
      message: {
        body: message,
      },
    },
    { headers }
  );
};

export const deleteStackById = async (stackId: string) => {
  await axios.delete(`api/channel/1.0/stack/${stackId}`, { headers });
};

export const addQuestionCardToStack = async (
  stackId: string,
  cardId: string
) => {
  await axios.post(`api/channel/1.0/stack/${stackId}/card`, {
    cardType: 'QuestionSet',
    cardId: `${cardId}`,
  });
};

export const publishDraftStack = async (stackId: string) => {
  await axios.post(`api/channel/1.0/stack/${stackId}/publish`, { headers });

  // probabil trebuie return
};

export const unbindQuestionCardFromStack = async (
  stackId: string,
  cardId: string
) => {
  const response = await axios.delete(
    `api/channel/1.0/stack/${stackId}/card/${cardId}`,
    { headers }
  );

  // sau response.data
  return response;
};
