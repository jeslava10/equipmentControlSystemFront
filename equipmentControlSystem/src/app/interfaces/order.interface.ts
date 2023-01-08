import School from './school.interface';

interface Order {
  message: '';
  orderResponseDto: OrderResponseDto[];
}

interface OrderResponseDto {
  name: string;
  id: number;
  model: string;
  serialNumber: string;
  asset: number;
  issue: string;
  incident: number;
  note: string;
  statusOrder: string;
  dateCreate: string;
  orderNumber: number;
  idUserMod: IdUserMod;
  idUserCreate: IdUserCreate;
  school: School;
}

interface IdUserMod {
  id: number;
  email: string;
  name: string;
  rol: string;
}

interface IdUserCreate {
  id: number;
  email: string;
  name: string;
  rol: string;
}

export default Order;
