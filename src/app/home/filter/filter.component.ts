import { Component, EventEmitter, inject, Output, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatExpansionModule
  ],
})
export class FilterComponent {
  dateFilterForm: FormGroup;
  @Output() applyFilter: EventEmitter<{}> = new EventEmitter();
  accordion = viewChild.required(MatAccordion);
  readonly panelOpenState = signal(false);
  datePipe: DatePipe = inject(DatePipe);

  constructor(private fb: FormBuilder) {
    this.dateFilterForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
    });
  }

  clearDate(name: string): void {
    this.dateFilterForm.get(name)?.reset();
  }

  onSubmit(): void {
    this.applyFilter.emit(this.dateFilterForm.value);
  }
}
