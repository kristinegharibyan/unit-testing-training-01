import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseComponent } from './add-transaction.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let componentInstance: AddExpenseComponent;
  let fixture: ComponentFixture<AddExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddExpenseComponent ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(AddExpenseComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    const formValue = componentInstance.form.value;
    expect(formValue.title).toBe('');
    expect(formValue.amount).toBe(0);
    expect(componentInstance.type()).toBe('expense');
  });

  it('cancel clicked', () => {
    const cancelTransactionSpy = spyOn(componentInstance, 'cancel').and.callThrough();
    fixture.debugElement.query(By.css('.danger')).triggerEventHandler('click', null);

    expect(cancelTransactionSpy).toHaveBeenCalled();
  })

  it('saved clicked', () => {
    const cancelTransactionSpy = spyOn(componentInstance, 'addTransaction').and.callThrough();
    fixture.debugElement.query(By.css('#addButton')).triggerEventHandler('click', null);

    expect(cancelTransactionSpy).toHaveBeenCalled();
  })

  it('reset form', () => {
    componentInstance.form.controls.title.setValue('Water');
    componentInstance.form.controls.amount.setValue(10);
    componentInstance.cancel();

    expect(componentInstance.form.controls.title.value).toBe('');
    expect(componentInstance.form.controls.amount.value).toBe(0);
    expect(componentInstance.type()).toBe('expense');
    expect(componentInstance.open()).toBeFalse();
  });

  it('add transaction', () => {
    spyOn(componentInstance.transactionAdded, 'emit');
    componentInstance.form.controls.title.setValue('Breakfast');
    componentInstance.form.controls.amount.setValue(20);
    componentInstance.addTransaction();

    expect(componentInstance.transactionAdded.emit).toHaveBeenCalled();
  });

  it('check wrong transaction', () => {
    spyOn(componentInstance.transactionAdded, 'emit');
    componentInstance.form.controls.title.setValue('');
    componentInstance.form.controls.amount.setValue(210);
    componentInstance.addTransaction();

    expect(componentInstance.transactionAdded.emit).not.toHaveBeenCalled();
  });

  it('open dialog', () => {
    componentInstance.open();

    expect(componentInstance.open()).toBeFalse();
  })
});
