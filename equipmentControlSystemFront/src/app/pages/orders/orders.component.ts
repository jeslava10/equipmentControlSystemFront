import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SchoolService } from 'src/app/services/school.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Order from 'src/app/interfaces/order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  Delete = 'Delete';

  productDialog: boolean = false;

  orders: Order[] = [];

  order: Order = {
    message: '',
    orderResponseDto: [],
  };

  submitted: boolean = true;

  url = '/api/orders';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${environment.token}`,
  });

  constructor(
    private schoolService: SchoolService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log('NgOnInit');

    this.http
      .get(this.url, { headers: this.headers })
      .subscribe((value: any) => {
        this.orders = value.schoolsDto;
      });
  }

  openNew() {
    this.order = {
      message: '',
      orderResponseDto: [],
    };
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(school: Order) {
    this.productDialog = true;
    this.order = school;
  }

  deleteProduct(school: Order) {
    console.log('school', school);
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' +
        school.orderResponseDto[0].name +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //Usar endpoint delete school
        //Usar endpoint getSchool para traer listado de escuelas
        this.http
          .delete(this.url + `/${school.orderResponseDto[0].id}`, {
            headers: this.headers,
          })
          .subscribe((value) => {
            this.updateView();
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveSchool() {
    this.submitted = true;

    if (this.order.orderResponseDto[0].name.trim()) {
      if (this.order.orderResponseDto[0].id !== 0) {
        //If id already exist the school get an update
        //Consumir endpoint de update School
        this.http
          .put(this.url, this.order, { headers: this.headers })
          .subscribe((value) => {
            this.updateView();
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        //Consumir endpoint guardado
        this.http
          .post(this.url, this.order, { headers: this.headers })
          .subscribe((value) => {
            this.updateView();
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }
      this.productDialog = false;
    }
    console.log(this.order);
  }

  updateView = () => {
    this.http
      .get(this.url, { headers: this.headers })
      .subscribe((value: any) => {
        this.orders = value.schoolsDto;
      });
  };

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].orderResponseDto[0].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
