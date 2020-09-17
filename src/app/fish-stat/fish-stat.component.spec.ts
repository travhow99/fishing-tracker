import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishStatComponent } from './fish-stat.component';

describe('FishStatComponent', () => {
  let component: FishStatComponent;
  let fixture: ComponentFixture<FishStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FishStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
