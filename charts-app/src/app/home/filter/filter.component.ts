import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
  ],
})
export class FilterComponent {

  dateFilterForm: FormGroup;
  @Output() applyFilter: EventEmitter<{}> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.dateFilterForm = this.fb.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  clearDate(name: string): void {
    this.dateFilterForm.get(name)?.reset();
  }

  onSubmit(): void {
      this.applyFilter.emit(this.dateFilterForm.value);
  }

}
