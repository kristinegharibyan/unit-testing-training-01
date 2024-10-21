import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let componentInstance: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppComponent ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeTruthy();
  });
});
