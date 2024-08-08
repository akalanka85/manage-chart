import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { FormBuilder } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        BrowserAnimationsModule,
        FilterComponent
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.dateFilterForm.get('fromDate')?.value).toBe('');
    expect(component.dateFilterForm.get('toDate')?.value).toBe('');
  });

  it('should clear the date field when clearDate is called', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');

    component.dateFilterForm.get('fromDate')?.setValue('2024-01-01');
    component.clearDate('fromDate', event);

    expect(component.dateFilterForm.get('fromDate')?.value).toBeNull();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

});
