import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassComponent } from './new-pass.component';

describe('NewPassComponent', () => {
  let component: NewPassComponent;
  let fixture: ComponentFixture<NewPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
