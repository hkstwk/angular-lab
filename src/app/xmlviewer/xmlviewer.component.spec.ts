import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlviewerComponent } from './xmlviewer.component';

describe('XmlviewerComponent', () => {
  let component: XmlviewerComponent;
  let fixture: ComponentFixture<XmlviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmlviewerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(XmlviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
