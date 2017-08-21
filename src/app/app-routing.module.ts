import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddDisciplineComponent } from './add-discipline/add-discipline.component';
import { EditDisciplineComponent } from './edit-discipline/edit-discipline.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DashboardDisciplineComponent } from './dashboard-discipline/dashboard-discipline.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { QuizesComponent } from './quizes/quizes.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { ForumComponent } from './forum/forum.component';
import { CategoryComponent } from './category/category.component';
import { TopicComponent } from './topic/topic.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { ContentsComponent } from './contents/contents.component';
import { AddContentComponent } from './add-content/add-content.component';
import { StudentsComponent } from './students/students.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { MessagesComponent } from './messages/messages.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'message/add', component: AddMessageComponent, canActivate: [AuthGuard] },
  { path: 'messages/:id', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'discipline/add', component: AddDisciplineComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id', component: DashboardDisciplineComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/quizes', component: QuizesComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/quizes/add', component: AddQuizComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/quizes/:quiz', component: AddQuizComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/edit', component: EditDisciplineComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/forum', component: ForumComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/forum/add', component: AddCategoryComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/forum/category/:id', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/forum/category/:id/add', component: AddTopicComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/forum/category/:id/topic/:id', component: TopicComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/contents', component: ContentsComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/contents/add', component: AddContentComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/contents/:content', component: AddContentComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
