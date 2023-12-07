import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalclienteComponent } from './modalcliente.component';

describe('ModalclienteComponent', () => {
  let component: ModalclienteComponent;
  let fixture: ComponentFixture<ModalclienteComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
