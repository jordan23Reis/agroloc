import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebRegisterComponent } from './web-register.component';

describe('WebRegisterComponent', () => {
  let component: WebRegisterComponent;
  let fixture: ComponentFixture<WebRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
