import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from '../api.service';
import { Statistics } from '../statistics';

@Component({
	selector: 'app-fish-stat',
	templateUrl: './fish-stat.component.html',
	styleUrls: ['./fish-stat.component.scss']
})
export class FishStatComponent implements OnInit {
	stats: Statistics[] = [];
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
		this.getStatistics(this.label);
	}

	getStatistics(status: string) {
		this.barChartData = [{ data: [], backgroundColor: [], label: this.label }];
		this.barChartLabels = [];
		this.api.getStatistics(status)
			.subscribe((res: any) => {
				this.stats = res;
				const chartdata: number[] = [];
				const chartcolor: string[] = [];
				this.stats.forEach((stat) => {
					this.barChartLabels.push(stat._id.date);
					chartdata.push(stat.count);
					if (this.label === 'Rainbow') {
						chartcolor.push('rgba(255, 165, 0, 0.5)');
					} else if (this.label === 'Brown') {
						chartcolor.push('rgba(255, 0, 0, 0.5)');
					} else {
						chartcolor.push('rgba(0, 255, 0, 0.5)');
					}
				});
				this.barChartData = [{ data: chartdata, backgroundColor: chartcolor, label: this.label }];
				this.isLoadingResults = false;
			}, err => {
				console.log(err);
				this.isLoadingResults = false;
			});

	}

	changeStatus() {
		this.isLoadingResults = true;
		this.getStatistics(this.label);
	}
}
