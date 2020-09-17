import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Fish } from '../fish';

@Component({
	selector: 'app-fish-details',
	templateUrl: './fish-details.component.html',
	styleUrls: ['./fish-details.component.scss']
})
export class FishDetailsComponent implements OnInit {
	fish: Fish = {
		_id: '',
		type: '',
		length: '',
		date: null,
		time_of_day: '',
		river: '',
		area: '',
		fly: '',
		status: '',
		updated: null,	
	};
	isLoadingResults = true;

	constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

	ngOnInit(): void {
		this.getFishDetails(this.route.snapshot.params.id);
	}

	getFishDetails(id: string) {
		this.api.getFishById(id)
			.subscribe((data: any) => {
				this.fish = data;
				console.log(this.fish);
				this.isLoadingResults = false;
			});
	}

	deleteFish(id: string) {
		this.isLoadingResults = true;
		this.api.deleteFish(id)
			.subscribe((res) => {
				this.isLoadingResults = false;
				this.router.navigate(['/fish']);
			}, (err) => {
				console.log(err);
				this.isLoadingResults = false;
			});
	}
}
