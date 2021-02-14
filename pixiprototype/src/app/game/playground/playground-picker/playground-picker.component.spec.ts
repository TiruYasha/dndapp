import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundPickerComponent } from './playground-picker.component';

describe('PlaygroundPickerComponent', () => {
  let component: PlaygroundPickerComponent;
  let fixture: ComponentFixture<PlaygroundPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaygroundPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
