import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import User from 'src/app/interfaces/users.interface';
interface Roles {
    name: string;
    code: number;
}
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
    Delete = 'Delete';
    errorMessage?: string;

    roles: Roles[] = [];
    selectedRoles1: Roles = { name: '', code: 0 };

    productDialog: boolean = false;

    users: User[] = [];
    usersCambioRol: User[] = [];

    user: User = {
        message: '',
        usersDto: [],
    };

    submitted: boolean = true;
    

    url = '/api/users';

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${environment.token}`,
    });

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private http: HttpClient
    ) {
        this.roles = [
            { name: 'Admin', code: 1 },
            { name: 'Employee', code: 2 },
        ];
    }

    ngOnInit() {
        this.http.get<any>(this.url, { headers: this.headers }).subscribe({
            next: (value) => {
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
            error: (error) => {
                console.log(error);
                this.errorMessage = error.message;
                if (error.status == 403) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'error',
                        detail: this.errorMessage,
                        life: 3000,
                    });
                } else {
                    this.messageService.add({
                        summary: 'error',
                        detail: error.error.message,
                        life: 3000,
                    });
                }
            },
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
        if (this.user.usersDto[0].rol == 1) {
            this.selectedRoles1 = { name: 'Admin', code: 1 };
        } else {
            this.selectedRoles1 = { name: 'Employee', code: 2 };
        }
    }

    deleteProduct(school: User) {
        console.log('user', school);
        this.confirmationService.confirm({
            message:
                'Are you sure you want to delete ' +
                school.usersDto[0].name +
                '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.http
                    .delete(this.url + `/${school.usersDto[0].id}`, {
                        headers: this.headers,
                    })
                    .subscribe({
                        next: (value) => {
                            this.updateView();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'User Deleted',
                                life: 3000,
                            });
                        },
                        error: (error) => {
                            console.log(error);
                            this.errorMessage = error.message;
                            if (error.status == 403) {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'error',
                                    detail: this.errorMessage,
                                    life: 3000,
                                });
                            } else {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'error',
                                    detail: error.error.message,
                                    life: 3000,
                                });
                            }
                        },
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
        if (
            this.user.usersDto[0].name.trim() &&
            this.user.usersDto[0].email.trim() &&
            this.user.usersDto[0].passwd.trim() &&
            !this.validarPassword()
        ) {
            this.user.usersDto[0].rol = this.selectedRoles1.code;
            if (this.selectedRoles1.code > 0) {
                if (this.user.usersDto[0].id !== 0) {
                    this.http
                        .put(this.url, this.user.usersDto[0], {
                            headers: this.headers,
                        })
                        .subscribe({
                            next: (value) => {
                                this.updateView();
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Successful',
                                    detail: 'User Updated',
                                    life: 3000,
                                });
                            },
                            error: (error) => {
                                console.log(error);
                                this.errorMessage = error.message;
                                if (error.status == 403) {
                                    this.messageService.add({
                                        severity: 'error',
                                        summary: 'error',
                                        detail: this.errorMessage,
                                        life: 3000,
                                    });
                                } else {
                                    this.messageService.add({
                                        severity: 'error',
                                        summary: 'error',
                                        detail: error.error.message,
                                        life: 3000,
                                    });
                                }
                            },
                        });
                } else {
                    this.http
                        .post(this.url, this.user.usersDto[0], {
                            headers: this.headers,
                        })
                        .subscribe({
                            next: (value) => {
                                this.updateView();
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Successful',
                                    detail: 'User Created',
                                    life: 3000,
                                });
                            },
                            error: (error) => {
                                if (error.status == 403) {
                                    this.errorMessage = error.message;
                                    this.messageService.add({
                                        severity: 'error',
                                        summary: 'error',
                                        detail: this.errorMessage,
                                        life: 3000,
                                    });
                                } else {
                                    this.messageService.add({
                                        severity: 'error',
                                        summary: 'error',
                                        detail: error.error.message,
                                        life: 3000,
                                    });
                                }
                            },
                        });
                }
                this.productDialog = false;
            }
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

    validarEmail = () => {
        let regexEmailTest = false;
        const regexEmail = new RegExp("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.]+@[a-zA-Z0-9.]+$");
        if (this.user.usersDto[0].email !== '') {
            regexEmailTest = regexEmail.test(
                this.user.usersDto[0].email
            );
            return !regexEmailTest;
        } else {
            return false;
        }
    };

    validarPassword = () => {
        let regexPasswordTest = false;
        const regexPassword = new RegExp(
            '^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$'
        );
        if (this.user.usersDto[0].passwd !== '') {
            regexPasswordTest = regexPassword.test(
                this.user.usersDto[0].passwd
            );
            return !regexPasswordTest;
        } else {
            return false;
        }
    };

    validarRol = () => {
        let regexPasswordTest = false;
        if (this.selectedRoles1.code > 0) {
            console.log(this.selectedRoles1.code)
            console.log(!regexPasswordTest)
            return !regexPasswordTest
        } else {
            return false;
        }
    };
}
