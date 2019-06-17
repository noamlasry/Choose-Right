import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DonorsComponent } from './donors/donors.component';
import { DonorComponent } from './donors/donor/donor.component';
import { DonorEditorComponent } from './donors/donor-editor/donor-editor.component';
import { DonationEditorComponent } from './donors/donation-editor/donation-editor.component';
import { AuthGuard } from './login/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { TaskComponent } from './home/task/task.component';
import { TasksComponent } from './home/tasks/tasks.component';


const routes: Routes = [
	{ path: '', canActivate: [AuthGuard], component: TasksComponent },
	{ path: 'donors', canActivate: [AuthGuard], component: DonorsComponent },
	{ path: 'donor/:id', canActivate: [AuthGuard], component: DonorComponent },
	{ path: 'donation-editor/:donor', canActivate: [AuthGuard], component: DonationEditorComponent },
	{ path: 'donation-editor/:donor/:donation', canActivate: [AuthGuard], component: DonationEditorComponent },
	{ path: 'donor-editor/:id', canActivate: [AuthGuard], component: DonorEditorComponent },
	{ path: 'donor-editor', canActivate: [AuthGuard], component: DonorEditorComponent },
	{ path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'task', component: TaskComponent },
	{ path: 'tasks', component: TasksComponent }
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
