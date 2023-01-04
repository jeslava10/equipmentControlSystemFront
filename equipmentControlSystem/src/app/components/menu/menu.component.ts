import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private primengConfig: PrimeNGConfig, private router: Router) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'Schools',
        icon: 'pi pi-fw pi-home',
        command: this.goToSchoolPage,
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        command: this.goToUsersPage,
      },
      {
        label: 'Orders',
        icon: 'pi pi-fw pi-book',
        command: this.goToOrdersPage,
      },
      {
        label: 'Diary',
        icon: 'pi pi-fw pi-calendar',
        command: this.goToDiaryPage,
      },
    ];
  }

  goToSchoolPage = () => {
    this.router.navigateByUrl('/school')
    console.log('School');
  };
  
  goToUsersPage = () => {
    this.router.navigateByUrl('/users')
    console.log('Users');
  };
  
  goToOrdersPage = () => {
    this.router.navigateByUrl('/orders')
    console.log('Orders');
  };
  
  goToDiaryPage = () => {
    this.router.navigateByUrl('/diary')
    console.log('Diary');
  };

  cerrarSesion=()=>{
    console.log('Sesion cerrada')
  }
}
