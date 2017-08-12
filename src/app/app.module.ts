import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickOutsideDirective } from './util/click-outside.directive';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { Provider } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddDisciplineComponent } from './add-discipline/add-discipline.component';
import { EditDisciplineComponent } from './edit-discipline/edit-discipline.component';
import { DashboardDisciplineComponent } from './dashboard-discipline/dashboard-discipline.component';
import { QuizesComponent } from './quizes/quizes.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { ListDisciplineComponent } from './list-discipline/list-discipline.component';
import { IconSelectorComponent } from './add-discipline/icon-selector/icon-selector.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAblFffPoJTp4GX3J3NK968hjm9_95PU8k',
  authDomain: 'psedu-c19d1.firebaseapp.com',
  databaseURL: 'https://psedu-c19d1.firebaseio.com',
  projectId: 'psedu-c19d1',
  storageBucket: 'psedu-c19d1.appspot.com',
  messagingSenderId: '976897345430'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddDisciplineComponent,
    DashboardDisciplineComponent,
    QuizesComponent,
    AddQuizComponent,
    EditDisciplineComponent,
    ListDisciplineComponent,
    IconSelectorComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
