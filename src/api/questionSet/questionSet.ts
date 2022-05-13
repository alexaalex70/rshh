import { QuestionSet } from '../../types/questionSet/Question/QuestionSet';
import { AnswerBody } from '../../types/questionSet/Answer/Answer';
import { RHPfetch, RHPResponse } from '../../config/apiWrapper';
import { REACT_APP_QS_API } from '@env';

export const getQuestionSets = async (): Promise<{
  questionSets: QuestionSet[];
}> => {
  const response = await RHPfetch(`${REACT_APP_QS_API}/questionset`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  });

  const result = await RHPResponse(response);
  return result?.body;
};

export const getQuestionSetById = async (
  questionId: string
): Promise<QuestionSet> => {
  const response = await RHPfetch(
    `${REACT_APP_QS_API}/questionset/${questionId}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    }
  );

  const result = await RHPResponse(response);
  return result?.body;
};

export const patchQuestionSetById = async (
  questionSetId: string,
  body: AnswerBody
) => {
  const response = await RHPfetch(
    `${REACT_APP_QS_API}/questionset/${questionSetId}`,
    {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(body),
    }
  );

  const result = await RHPResponse(response);
  return result?.body;
};

// TODO: Check if response is actually recieved by this API call
export const deleteQuestionSetById = async (questionSetId: string) => {
  const response = await RHPfetch(
    `${REACT_APP_QS_API}/questionset/${questionSetId}`,
    {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    }
  );

  return await RHPResponse(response);
};

// TODO: create interfaces for the arguments
export const createQuestionSet = async (
  stackId: string,
  title: any,
  sections: any
) => {
  const response = await RHPfetch(`${REACT_APP_QS_API}/questionset`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify({
      stackId: `${stackId}`,
      title: {
        internal: title.internal,
        external: {
          en: title.external.en,
        },
      },
      clinicianVisibilityOnly: true,
      sections: [
        {
          title: {
            internal: title.internal,
            external: {
              en: title.external.en,
            },
          },
          templateId: sections?.id,
          questions: sections.questions,
        },
      ],
    }),
  });

  return await RHPResponse(response);
};

// TODO: I think this function should be renamed to getTemplateById or getQuestionSetTemplateById
export const getQuestionSet = async (selectedQuestionId: string) => {
  const response = await RHPfetch(
    `${REACT_APP_QS_API}/template/${selectedQuestionId}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    }
  );

  return await RHPResponse(response);
};
