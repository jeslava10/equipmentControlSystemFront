interface School {
  message: string;
  schoolsDto: SchoolsDto[];
}

interface SchoolsDto {
  id: 0;
  name: '';
}

export default School;
export { SchoolsDto };
