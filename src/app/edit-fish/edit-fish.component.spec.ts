import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFishComponent } from './edit-fish.component';

describe('EditFishComponent', () => {
  let component: EditFishComponent;
  let fixture: ComponentFixture<EditFishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
