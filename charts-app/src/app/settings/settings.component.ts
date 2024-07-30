import { ChartStore } from './../store/chart.store';
import { Component, inject, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ChartFormComponent } from './chart-form/chart-form.component';
import { Chart } from '../modals/chart';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatIconModule],
})
export class SettingsComponent implements OnInit {
  chartStore = inject(ChartStore);
  displayedColumns: string[] = ['name', 'type', 'actions'];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(chart: Chart): void {
    const dialogRef = this.dialog.open(ChartFormComponent, {
      width: '600px', data: chart
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result) {
        if(!!result.id) {
          this.chartStore.updateChart(result)
        } else {
          result.id = this.genarateRandomId();
          this.chartStore.addToList(result)
        }
      }
    });
  }

  addChart() {
    this.openDialog({} as Chart)
  }

  genarateRandomId() {
    return Math.floor(Math.random() * 1000) + 1;
  }

}
