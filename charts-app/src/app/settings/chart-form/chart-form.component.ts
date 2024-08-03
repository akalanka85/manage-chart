import { OrderService } from './../../services/order.service';
import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormArray,
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
import { ChartStore } from '../../store/chart.store';

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
  chartStore = inject(ChartStore);
  orderService = inject(OrderService);
  chartTypes = [{name: 'Bar', value: 'bar'},
    {name: 'Column', value: 'column'},
    {name: 'Spline', value: 'spline'},
    {name: 'Pie', value: 'pie'},
    {name: 'Area', value: 'area'},
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChartFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Chart
  ) {
    this.chartForm = this.fb.group({
      id: [data.id],
      name: [data.name, [Validators.required]],
      type: [data.type, [Validators.required]],
      colors: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.orderService.getData().subscribe((orders) => {
      orders.forEach((order) => this.addColorItem(order.name));
    });
  }

  addColorItem(name: string): void {
    this.colors.push(
      this.fb.group({
        name: [name, Validators.required],
        color: [this.getColor(name)],
      })
    );
  }

  getColor(name: string) {
    if(!this.data.colors) {
      return '#000';
    }
    const currentColor = this.data.colors.find((c) => c.name === name);
    return currentColor ? currentColor.color : '#000';
  }

  onSubmit() {
    console.log(this.chartForm.value);
    if (this.chartForm.valid) {
      this.dialogRef.close(this.chartForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get colors(): FormArray {
    return this.chartForm.get('colors') as FormArray;
  }
}
