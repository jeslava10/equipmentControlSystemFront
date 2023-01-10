import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import School, { SchoolsDto } from 'src/app/interfaces/school.interface';

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
    schoolsDto:  [ {
        id: 0,
        name: '',
      }
    ]
  };

  schoolsDto: SchoolsDto = {
    id: 0,
    name: '',
  }

  submitted: boolean = true;

  url = '/api/school';

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
      schoolsDto:[{
          id: 0,
          name: '',
        }
    ]
    };

    this.schoolsDto =    {
        id: 0,
        name: '',
      };

    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(schoolEdit: School) {
    this.productDialog = true;
    this.school = schoolEdit;
    this.schoolsDto = schoolEdit.schoolsDto[0];
    console.log('schoolEdit',  this.school);
    console.log('schoolsDto',  this.school);
  }

  deleteProduct(schoolDelete: School) {
    console.log('schoolDelete', schoolDelete);
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + schoolDelete.schoolsDto[0].name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http
          .delete(this.url + `/${schoolDelete.schoolsDto[0].id}`, {
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
        this.http
          .put(this.url, this.school.schoolsDto, { headers: this.headers })
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
        console.log(this.school);
        this.http
          .post(this.url, this.school.schoolsDto, { headers: this.headers })
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
