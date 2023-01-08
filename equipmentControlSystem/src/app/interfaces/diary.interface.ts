import { SchoolsDto } from './school.interface';
import { UsersDto } from './users.interface';

interface Diary {
  message: string;
  diaryDto: DiaryDto[];
}

interface DiaryDto {
  id: number;
  user: UsersDto;
  school: SchoolsDto;
  weekday: number;
  startTime: string;
  endingTime: string;
  replacement: string;
}

export default Diary;
