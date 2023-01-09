import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SchoolService } from 'src/app/services/school.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import School from 'src/app/interfaces/school.interface';

@Component({
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.scss'],
})
export class TableCrudComponent implements OnInit {
  Delete = 'Delete';

  productDialog: boolean = false;

  schools: School[] = [];

  school: School = {
    message: '',
    schoolsDto: [],
  };

  submitted: boolean = true;

  url = '/api/school';

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
      .get('/api/school/', { headers: this.headers })
      .subscribe((value: any) => {
        this.schools = value.schoolsDto;
      });
  }

  openNew() {
    this.school = {
      message: '',
      schoolsDto: [
        {
          id: 0,
          name: '',
        },
      ],
    };
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(school: School) {
    this.productDialog = true;
    this.school = school;
  }

  deleteProduct(school: School) {
    console.log('school', school);
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + school.schoolsDto[0].name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //Usar endpoint delete school
        //Usar endpoint getSchool para traer listado de escuelas
        this.http
          .delete(this.url + `/${school.schoolsDto[0].id}`, {
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

    if (this.school.schoolsDto[0].name.trim()) {
      if (this.school.schoolsDto[0].id !== 0) {
        //If id already exist the school get an update
        //Consumir endpoint de update School
        this.http
          .put(this.url, this.school, { headers: this.headers })
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
          .post(this.url, this.school, { headers: this.headers })
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
    console.log(this.school);
  }

  updateView = () => {
    this.http
      .get(this.url, { headers: this.headers })
      .subscribe((value: any) => {
        this.schools = value.schoolsDto;
      });
  };

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.schools.length; i++) {
      if (this.schools[i].schoolsDto[0].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
