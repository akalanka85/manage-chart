import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Chart } from '../../modals/chart';

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class ChartFormComponent implements OnInit {
  chartForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChartFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Chart
  ) {
    this.chartForm = this.fb.group({
      id: [data.id],
      name: [data.name, [Validators.required]],
      type: [data.type, [Validators.required]],
      colors: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.chartForm.valid) {
      this.dialogRef.close(this.chartForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
