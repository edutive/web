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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DashboardDisciplineComponent } from './dashboard-discipline/dashboard-discipline.component';
import { QuizesComponent } from './quizes/quizes.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { ListDisciplineComponent } from './list-discipline/list-discipline.component';
import { IconSelectorComponent } from './add-discipline/icon-selector/icon-selector.component';
import { ForumComponent } from './forum/forum.component';
import { CategoryComponent } from './category/category.component';
import { TopicComponent } from './topic/topic.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { ContentsComponent } from './contents/contents.component';
import { AddContentComponent } from './add-content/add-content.component';
import { FilterPipe } from './util/filter.pipe';
import { StudentsComponent } from './students/students.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { MessagesComponent } from './messages/messages.component';

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
    ClickOutsideDirective,
    ForumComponent,
    EditProfileComponent,
    CategoryComponent,
    TopicComponent,
    AddCategoryComponent,
    AddTopicComponent,
    ContentsComponent,
    AddContentComponent,
    FilterPipe,
    StudentsComponent,
    AddMessageComponent,
    MessagesComponent
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
