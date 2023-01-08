interface OrderNumberBySchool {
  message: string;
  orderBySchoolResponseDto: OrderBySchoolResponseDto[];
}

interface OrderBySchoolResponseDto {
  id: number;
  orderNro: number;
  orderDate: string;
  orderSchool: number;
  orderSchoolName: string;
}

export default OrderNumberBySchool;
