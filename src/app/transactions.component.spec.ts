import { ComponentFixture, TestBed } from "@angular/core/testing";

import TransactionsComponent from "./transactions.component"
import { By } from "@angular/platform-browser";


describe('TransactionsComponent', () => {
  let componentInstance: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ TransactionsComponent ],
      }).compileComponents();
    
    fixture = TestBed.createComponent(TransactionsComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h2')?.textContent).toContain('Transactions');
  });

  it('should calculate the correct current balance', () => {
    expect(componentInstance.currentBalance()).toEqual(4820);
  });

  it('should open the add transaction dialog', () => {
    componentInstance.openAddTransactionDialog();
    fixture.detectChanges();

    expect(componentInstance.addTransactionDialogOpen()).toBe(true);
  });

  it('add transaction', () => {
    const newTransaction = { amount: 100, title: 'Bonus' };
    componentInstance.addTransaction(newTransaction);
    fixture.detectChanges();

    expect(componentInstance.transactions().length).toBe(5);
    expect(componentInstance.currentBalance()).toEqual(4920);

    // expect new line right added
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Bonus');
    expect(compiled.textContent).toContain(100);
  })

  it('delete transaction', () => {
    const transactionsLength = componentInstance.transactions().length;
    componentInstance.deleteTransaction(1);
    fixture.detectChanges();

    expect(componentInstance.transactions().length).toBe(transactionsLength - 1);
    expect(componentInstance.currentBalance()).toEqual(4920);

    // check removed line not exist
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Groceries');
    expect(compiled.textContent).not.toContain('-100');
  })

  it('add clicked', () => {
    const addTransactionSpy = spyOn(componentInstance, 'openAddTransactionDialog').and.callThrough();
    fixture.debugElement.query(By.css('#addButton')).triggerEventHandler('click', null);

    expect(addTransactionSpy).toHaveBeenCalled();
  })

  it('delete clicked', () => {
    const deleteTransactionSpy = spyOn(componentInstance, 'deleteTransaction').and.callThrough();
    fixture.debugElement.query(By.css('.danger')).triggerEventHandler('click', null);

    expect(deleteTransactionSpy).toHaveBeenCalled();
  })
})
