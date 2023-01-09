interface User {
  message: string;
  usersDto: UsersDto[];
}

interface UsersDto {
  id: number;
  email: string;
  passwd: string;
  name:string;
  rol: number;
}

export default User;
export { UsersDto }
