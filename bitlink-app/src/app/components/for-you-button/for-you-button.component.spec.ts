import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForYouButtonComponent } from './for-you-button.component';

describe('ForYouButtonComponent', () => {
  let component: ForYouButtonComponent;
  let fixture: ComponentFixture<ForYouButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForYouButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForYouButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
