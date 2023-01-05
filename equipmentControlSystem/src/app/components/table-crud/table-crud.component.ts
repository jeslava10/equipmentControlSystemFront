import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/app/interfaces/school';
import { HttpHeaders, HttpClient } from '@angular/common/http';

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
    id: 0,
    name: '',
  };

  submitted: boolean = true;

  url = '/api/school';

  token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1AY29udHJvbHN5c3RlbS5jb20iLCJpYXQiOjE2NzI4ODA2MTUsImV4cCI6MTY3Mjg4NDIxNSwibmFtZSI6IkV2ZXIgdHJvbGwgY2FyZSBtb25kYSIsImlkIjoxLCJlbWFpbCI6ImFkbUBjb250cm9sc3lzdGVtLmNvbSIsInJvbCI6IjEifQ.-OZu4U3j1KzuuvGJCi3I6tuZle2eaKmgly1_EgtuxDb4KasQjDMn5HVqAqGRJPwX0njeQvyXLUlfSZ671DJ_Tg';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
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
      id: 0,
      name: '',
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
      message: 'Are you sure you want to delete ' + school.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //Usar endpoint delete school
        //Usar endpoint getSchool para traer listado de escuelas
        this.http
          .delete(this.url + `/${school.id}`, { headers: this.headers })
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

    if (this.school.name.trim()) {
      if (this.school.id !== 0) {
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
      .get('/api/school/', { headers: this.headers })
      .subscribe((value: any) => {
        this.schools = value.schoolsDto;
      });
  };

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.schools.length; i++) {
      if (this.schools[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
