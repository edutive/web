import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddDisciplineComponent } from './add-discipline/add-discipline.component';
import { EditDisciplineComponent } from './edit-discipline/edit-discipline.component';
import { DashboardDisciplineComponent } from './dashboard-discipline/dashboard-discipline.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { QuizesComponent } from './quizes/quizes.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'discipline/add', component: AddDisciplineComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id', component: DashboardDisciplineComponent, canActivate: [AuthGuard] },
  { path: 'discipline/:id/quizes', component: QuizesComponent },
  { path: 'discipline/:id/quizes/add-quiz', component: AddQuizComponent },
  { path: 'discipline/:id/edit', component: EditDisciplineComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
