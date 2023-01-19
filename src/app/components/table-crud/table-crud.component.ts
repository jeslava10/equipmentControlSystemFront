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
        schoolsDto: [
            {
                id: 0,
                name: '',
            },
        ],
    };

    schoolsDto: SchoolsDto = {
        id: 0,
        name: '',
    };

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
        this.updateView();
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

        this.schoolsDto = {
            id: 0,
            name: '',
        };

        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(schoolEdit: SchoolsDto) {
        console.log(schoolEdit);
        console.log(this.school.schoolsDto[0]);
        this.school.schoolsDto[0] = schoolEdit;
        this.productDialog = true;
    }

    deleteProduct(schoolDelete: SchoolsDto) {
        console.log('schoolDelete', schoolDelete);
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${schoolDelete.name} ?`,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log(this.url + `/${schoolDelete.id}`);
                this.http
                    .delete(this.url + '/' + schoolDelete.id, {
                        headers: this.headers,
                    })
                    .subscribe(
                        (value) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Product Deleted',
                                life: 3000,
                            });
                            this.updateView();
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'We could not delete school',
                                life: 3000,
                            });
                            console.log(`Sucedio este error: ${error}`);
                        }
                    );
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
                    .put(this.url, this.school.schoolsDto[0], {
                        headers: this.headers,
                    })
                    .subscribe(
                        (value) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'School Updated',
                                life: 3000,
                            });
                            this.updateView();
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'We could not update school',
                                life: 3000,
                            });
                            console.log(`Ocurrio este error: ${error}`);
                        }
                    );
            } else {
                //Consumir endpoint guardado
                console.log(this.school.schoolsDto);
                this.http
                    .post(this.url, this.school.schoolsDto[0], {
                        headers: this.headers,
                    })
                    .subscribe(
                        (value) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'School Created',
                                life: 3000,
                            });
                            this.updateView();
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'We could not create school',
                                life: 3000,
                            });
                            console.log(
                                `Ocurrio este error: ${JSON.stringify(error)}`
                            );
                        }
                    );
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

        // this.http
        //     .get('/api/school/', { headers: this.headers })
        //     .subscribe((value: any) => {
        //         this.schools = value.schoolsDto;
        //     });
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

    searchFilter = (event: any) => {
        const keyWord = event.target.value;
        if (keyWord === '') {
            this.updateView();
            console.log('Traer todo el resultado.');
        } else {
            const arrayToFilter = [...this.schools];
            this.schools = arrayToFilter.filter((school: any) => {
                if (school.name.includes(keyWord)) {
                    return school;
                }
            });
            console.log(`Copia de schools: ${JSON.stringify(arrayToFilter)}`);
            console.log('filtrando', event.target.value);
        }
    };
}
