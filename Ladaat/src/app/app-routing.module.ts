import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DonorsComponent } from './donors/donors.component';
import { DonorComponent } from './donors/donor/donor.component';
import { DonorEditorComponent } from './donors/donor-editor/donor-editor.component';
import { DonationComponent } from './donors/donation/donation.component';

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
