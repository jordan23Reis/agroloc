import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobMainComponent } from './mob-main.component';

describe('MobMainComponent', () => {
  let component: MobMainComponent;
  let fixture: ComponentFixture<MobMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
