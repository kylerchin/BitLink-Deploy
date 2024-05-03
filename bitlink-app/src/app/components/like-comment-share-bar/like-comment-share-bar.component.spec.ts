import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeCommentShareBarComponent } from './like-comment-share-bar.component';

describe('LikeCommentShareBarComponent', () => {
  let component: LikeCommentShareBarComponent;
  let fixture: ComponentFixture<LikeCommentShareBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeCommentShareBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikeCommentShareBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
