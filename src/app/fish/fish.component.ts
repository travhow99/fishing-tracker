import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Fish } from "../fish";

@Component({
	selector: 'app-fish',
	templateUrl: './fish.component.html',
	styleUrls: ['./fish.component.scss']
})
export class FishComponent implements OnInit {
	displayedColumns: string[] = ['type', 'length', 'date', 'river'];
	data: Fish[] = [];
	isLoadingResults = true;

	constructor(private api: ApiService) { }

	ngOnInit(): void {
		this.api.getFish()
			.subscribe((res: any) => {
				this.data = res;
				console.log(this.data);
				this.isLoadingResults = false;
			}, (err) => {
				console.log(err);
				this.isLoadingResults = false;
			});
	}

}
