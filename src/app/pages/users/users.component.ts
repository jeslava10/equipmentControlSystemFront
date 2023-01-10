import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import User from 'src/app/interfaces/users.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  Delete = 'Delete';
  errorMessage?: string;

  productDialog: boolean = false;

  users: User[] = [];
  usersCambioRol: User[] = [];

  user: User = {
    message: '',
    usersDto: [],
  };

  submitted: boolean = true;
  regex = new RegExp("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.]+@[a-zA-Z0-9.]+$");

  url = '/api/users';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${environment.token}`,
  });

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {}

  ngOnInit() {

    this.http.get<any>(this.url, { headers: this.headers }).subscribe({
      next: value => {
        this.users = value.usersDto;
        this.users.forEach((value: any) => {
          if (value.rol === '1') {
            value.rol = 'Admin';
          } else {
            value.rol = 'Employee';
          }
          console.log(value.rol);
        });
      },
      error: error => {
        console.log(error);
          if(error.status == 403){
            this.errorMessage = error.message;
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: this.errorMessage,
              life: 3000,
            });
          }else{
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: this.errorMessage,
              life: 3000,
            });
          }

      }
  });
  }

  openNew() {
    this.user = {
      message: '',
      usersDto: [{ id: 0, email: '', passwd: '', name: '', rol: 0 }],
    };
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(user: User) {
    this.productDialog = true;
    this.user = user;
  }

  deleteProduct(user: User) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + user.usersDto[0].name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(this.url + `/${user.usersDto[0].id}`, {headers: this.headers}).subscribe((value) => {
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

    this.http.get<any>(this.url, { headers: this.headers }).subscribe({
      next: value => {
      },
      error: error => {
        console.log(error);
          if(error.status == 403){
            this.errorMessage = error.message;
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: this.errorMessage,
              life: 3000,
            });
          }else{
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: this.errorMessage,
              life: 3000,
            });
          }

      }
  });

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveSchool() {
    this.submitted = true;
    if (this.user.usersDto[0].name.trim()) {
      if (this.user.usersDto[0].id !== 0) {
        //If id already exist the school get an update
        //Consumir endpoint de update School
        this.http
          .put(this.url, this.user.usersDto[0], { headers: this.headers })
          .subscribe((value) => {
            console.log(value);
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
          .post(this.url, this.user.usersDto[0], { headers: this.headers })
          .subscribe((value) => {
            console.log(value);
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
    console.log(this.user);
  }

  updateView = () => {
    this.http
      .get(this.url, { headers: this.headers })
      .subscribe((value: any) => {
        this.users = value.usersDto;
      });
  };

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].usersDto[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

}
