import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/app/interfaces/school';
import { HttpClient } from '@angular/common/http';
import { async } from '@angular/core/testing';

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

  constructor(
    private schoolService: SchoolService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {}

  ngOnInit = async() => {
    //Consumir escuelas de la APIs
    // this.schools = await this.http.get()
    // this.schools = [
    //   { id: 1, name: 'School' },
    //   { id: 2, name: 'School2' },
    //   { id: 3, name: 'School3' },
    // ];
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(school: School) {
    this.productDialog = true;
    this.school = school
  }

  deleteProduct(school: School) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + school.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //Usar endpoint delete school
        //Usar endpoint getSchool para traer listado de escuelas
        // this.school = Lista de schools traida desde API;
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
      if (this.school.id) {
        //If id already exist the school get an update
        //Consumir endpoint de update School
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.school.id = 0;
        //Consumir endpoint guardado
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      //Consumir getAll para Schools
      // this.schools = endpoint Response;
      this.productDialog = false;
    }
  }

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
