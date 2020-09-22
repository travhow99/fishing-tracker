import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-add-fish',
	templateUrl: './add-fish.component.html',
	styleUrls: ['./add-fish.component.scss']
})
export class AddFishComponent implements OnInit {
	fishForm: FormGroup;
	length: number = null;
	date: Date = null;
	time_of_day: '';
	river = '';
	area = '';
	fly = '';
	type = '';
	typeList = ['Rainbow', 'Brown', 'Cutthroat', 'Brook'];
	isLoadingResults = false;
	matcher = new ErrorStateMatcher();

	constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.fishForm = this.formBuilder.group({
			type: [null, Validators.required],
			length: [null, Validators.required],
			date: [null, Validators.required],
			time_of_day: [null, Validators.required],
			river: [null],
			area: [null],
			fly: [null],
		});
	}

	onFormSubmit() {
		this.isLoadingResults = true;
		this.api.addFish(this.fishForm.value)
			.subscribe((res: any) => {
				const id = res._id;
				this.isLoadingResults = false;
				this.router.navigate(['/fish-details', id]);
			}, (err: any) => {
				console.log(err);
				this.isLoadingResults = false;
			});
	}
}
