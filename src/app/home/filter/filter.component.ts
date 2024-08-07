import {
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { dateRangeValidator } from '../../validators/date-range.validator';
import { MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule
  ],
})
export class FilterComponent {
  dateFilterForm: FormGroup;
  @Output() applyFilter = new EventEmitter<{ fromDate: string; toDate: string }>();
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  readonly panelOpenState = signal(false);

  constructor(private fb: FormBuilder) {
    this.dateFilterForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
    }, { validator: dateRangeValidator() });
  }

  clearDate(name: string, event: MouseEvent): void {
    event.stopPropagation();
    this.dateFilterForm.get(name)?.reset();
  }

  removeChip(name: string): void {
    this.dateFilterForm.get(name)?.reset();
    this.applyFilter.emit(this.dateFilterForm.value);
  }

  clearForm(): void {
    this.dateFilterForm.reset();
    this.menuTrigger.closeMenu();
  }

  onSubmit(): void {
    this.applyFilter.emit(this.dateFilterForm.value);
    this.menuTrigger.closeMenu();
  }
}
