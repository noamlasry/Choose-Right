import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DonorsComponent } from './donors/donors.component';
import { DonorComponent } from './donors/donor/donor.component';
import { DonorEditorComponent } from './donors/donor-editor/donor-editor.component';
import { DonationEditorComponent } from './donors/donation-editor/donation-editor.component';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
	{ path: '', canActivate: [AuthGuard], component: HomeComponent },
	{ path: 'donors', canActivate: [AuthGuard], component: DonorsComponent },
	{ path: 'donor/:id', canActivate: [AuthGuard], component: DonorComponent },
	{ path: 'donation-editor/:donor', canActivate: [AuthGuard], component: DonationEditorComponent },
	{ path: 'donation-editor/:donor/:donation', canActivate: [AuthGuard], component: DonationEditorComponent },
	{ path: 'donor-editor/:id', canActivate: [AuthGuard], component: DonorEditorComponent },
	{ path: 'donor-editor', canActivate: [AuthGuard], component: DonorEditorComponent },
	{ path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
