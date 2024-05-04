import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageUserBarComponent } from './message-user-bar.component';

describe('MessageUserBarComponent', () => {
  let component: MessageUserBarComponent;
  let fixture: ComponentFixture<MessageUserBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageUserBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageUserBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
