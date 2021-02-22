import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowBlockComponent } from './show-block.component';

describe('ShowBlockComponent', () => {
  let component: ShowBlockComponent;
  let fixture: ComponentFixture<ShowBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
