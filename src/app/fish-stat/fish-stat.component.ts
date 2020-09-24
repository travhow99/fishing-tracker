import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from '../api.service';
import { Fish } from '../fish';

@Component({
	selector: 'app-fish-stat',
	templateUrl: './fish-stat.component.html',
	styleUrls: ['./fish-stat.component.scss']
})
export class FishStatComponent implements OnInit {
	stats: Fish[] = [];
	label = 'Positive';
	isLoadingResults = true;
	barChartOptions: ChartOptions = {
		responsive: true,
	};
	barChartLabels: Label[] = [];
	barChartType: ChartType = 'bar';
	barChartLegend = true;
	barChartPlugins = [];
	barChartData: ChartDataSets[] = [{ data: [], backgroundColor: [], label: this.label }];

	constructor(private api: ApiService) { }

	ngOnInit(): void {
		this.getFish();
	}

	getDaysOfMonth() {
		const d = new Date();

		const totalDays = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(); 

		const days = [];

		let x = 1;
		while (x < totalDays) {
			days.push(x);
			x++;
		}

		return days;
	}

	getFish() {
		this.barChartData = [{ data: [], backgroundColor: [], label: this.label }];
		this.barChartLabels = this.getDaysOfMonth();
		this.api.getFish()
			.subscribe((res: any) => {
				this.stats = res;
				const chartdata: number[] = [];
				const chartcolor: string[] = [];

				const days = this.getDaysOfMonth();

				const data = {};
				days.map((day) => {
					const fish = this.stats.filter((f) => {
						const d = new Date(f.date).getDate();
						return (d == day);
					})

					data[day] = fish.length;
				});

				console.log(data)

				Object.keys(data).map((d) => chartdata.push(data[d]))
				// chartdata.push(Object.values(data));

				chartcolor.push('rgba(255, 165, 0, 0.5)');

				this.barChartData = [{
					data: chartdata,
					backgroundColor: chartcolor,
					label: this.label
				}];

				this.isLoadingResults = false;
			}, err => {
				console.log(err);
				this.isLoadingResults = false;
			});

	}

	changeStatus() {
		this.isLoadingResults = true;
		this.getFish();
	}
}
