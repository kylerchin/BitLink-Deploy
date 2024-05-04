import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingPostPageComponent } from './following-post-page.component';

describe('FollowingPostPageComponent', () => {
  let component: FollowingPostPageComponent;
  let fixture: ComponentFixture<FollowingPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowingPostPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowingPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
