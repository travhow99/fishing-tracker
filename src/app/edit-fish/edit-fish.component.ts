import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-fish',
  templateUrl: './edit-fish.component.html',
  styleUrls: ['./edit-fish.component.scss']
})
export class EditFishComponent implements OnInit {
  fishForm: FormGroup;
  _id: '';
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

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getFishById(this.route.snapshot.params.id);
    this.fishForm = this.formBuilder.group({
			type: [null, Validators.required],
			length: [null],
			date: [null, Validators.required],
			time_of_day: [null],
			river: [null],
			area: [null],
			fly: [null],
		});
  }

  getFishById(id:any) {
    this.api.getFishById(id).subscribe((data: any) => {
      this._id = data._id;
      this.fishForm.setValue({
        type: data.type,
        length: data.length,
        date: data.date,
        time_of_day: data.time_of_day,
        river: data.river,
        area: data.area,
        fly: data.fly 
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateFish(this._id, this.fishForm.value)
      .subscribe((res: any) => {
        const id = res._id;
				this.isLoadingResults = false;
				this.router.navigate(['/fish-details', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }

  fishDetails() {
    this.router.navigate(['/fish-details', this._id]);
  }
}
