import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FishComponent } from './fish/fish.component';
import { FishDetailsComponent } from "./fish-details/fish-details.component";
import { AddFishComponent } from "./add-fish/add-fish.component";
import { EditFishComponent } from "./edit-fish/edit-fish.component";
import { FishStatComponent } from "./fish-stat/fish-stat.component";

const routes: Routes = [
	{
		path: 'fish',
		component: FishComponent,
		data: { title: 'List of Fish' }
	},
	{
		path: 'fish-details/:id',
		component: FishDetailsComponent,
		data: { title: 'Fish Details' }
	},
	{
		path: 'fish-stat',
		component: FishStatComponent,
		data: { title: 'Fish Statistics' }
	},
	{
		path: 'add-fish',
		component: AddFishComponent,
		data: { title: 'Add Fish' }
	},
	{
		path: 'edit-fish/:id',
		component: EditFishComponent,
		data: { title: 'Edit Fish' }
	},
	{ 
		path: '',
		redirectTo: '/fish',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
