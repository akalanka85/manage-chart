import { OrderService } from './../../services/order.service';
import { Component, Inject, OnInit, inject } from '@angular/core';
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
import { environment } from '../../../environments/environments';
import { Order } from '../../modals/order';

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
  chartTypes = environment.chartTypes;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChartFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Chart
  ) {
    this.chartForm = this.createForm(data);
  }

  ngOnInit(): void {
    this.loadOrderData();
  }

  createForm(chartData: Chart): FormGroup {
    return this.fb.group({
      id: [chartData.id],
      name: [chartData.name, Validators.required],
      type: [chartData.type, Validators.required],
      colors: this.fb.array([]),
    });
  }

  loadOrderData(): void {
    this.orderService.getData().subscribe((orders) => {
      const allOrders:Order[] = orders.data;
      allOrders.forEach((order) => this.addColorItem(order.name));
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

  getColor(name: string): string {
    if (!this.data.colors) {
      return '#000';
    }
    const currentColor = this.data.colors.find((c) => c.name === name);
    return currentColor ? currentColor.color : '#000';
  }

  onSubmit(): void {
    if (this.chartForm.valid) {
      this.dialogRef.close(this.chartForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get colors(): FormArray {
    return this.chartForm.get('colors') as FormArray;
  }
}
