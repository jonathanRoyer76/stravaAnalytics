import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastActivityPreviewComponent } from './last-activity-preview.component';

describe('LastActivityPreviewComponent', () => {
  let component: LastActivityPreviewComponent;
  let fixture: ComponentFixture<LastActivityPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastActivityPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastActivityPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
