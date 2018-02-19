import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreategalleryComponent } from './creategallery.component';

describe('CreategalleryComponent', () => {
  let component: CreategalleryComponent;
  let fixture: ComponentFixture<CreategalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreategalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreategalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
