import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUnitEditorComponent } from './work-unit-editor.component';

describe('WorkUnitEditorComponent', () => {
  let component: WorkUnitEditorComponent;
  let fixture: ComponentFixture<WorkUnitEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkUnitEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkUnitEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
