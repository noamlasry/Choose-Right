import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonorsComponent } from './donors/donors.component';
import { DonorComponent } from './donor/donor.component';
import { DonorEditorComponent } from './donor-editor/donor-editor.component';
import { DonationComponent } from './donation/donation.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'donors', component: DonorsComponent },
	{ path: 'donor/:id', component: DonorComponent },
	{ path: 'donation/:id', component: DonationComponent },
	{ path: 'donor-editor/:id', component: DonorEditorComponent },
	{ path: 'donor-editor', component: DonorEditorComponent },
	{ path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
