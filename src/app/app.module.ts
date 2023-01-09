import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SchoolComponent } from './pages/school/school.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DiaryComponent } from './pages/diary/diary.component';
import { TableCrudComponent } from './components/table-crud/table-crud.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
// --------------------------------------------------------------------------------
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { SchoolService } from './services/school.service';
import { AppLayoutModule } from './layout/app.layout.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NotfoundComponent } from './components/notfound/notfound.component';



@NgModule({
  declarations: [
    AppComponent,
    SchoolComponent,
    UsersComponent,
    OrdersComponent,
    DiaryComponent,
    TableCrudComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    HttpClientModule,
    AppLayoutModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },SchoolService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
