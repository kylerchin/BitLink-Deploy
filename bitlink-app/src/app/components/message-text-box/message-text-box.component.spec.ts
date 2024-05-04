import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTextBoxComponent } from './message-text-box.component';

describe('MessageTextBoxComponent', () => {
  let component: MessageTextBoxComponent;
  let fixture: ComponentFixture<MessageTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageTextBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
