import { Title } from '../Card/Card';
import { Question } from './Question';

export interface Section {
  title: Title;
  templateId: string;
  questions: Question[];
}
