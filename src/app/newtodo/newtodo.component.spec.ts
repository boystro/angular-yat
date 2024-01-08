import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtodoComponent } from './newtodo.component';

describe('NewtodoComponent', () => {
  let component: NewtodoComponent;
  let fixture: ComponentFixture<NewtodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewtodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
