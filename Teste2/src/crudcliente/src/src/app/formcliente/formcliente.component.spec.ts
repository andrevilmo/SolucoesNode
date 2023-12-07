import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormclienteComponent } from './formcliente.component';

describe('FormclienteComponent', () => {
  let component: FormclienteComponent;
  let fixture: ComponentFixture<FormclienteComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
