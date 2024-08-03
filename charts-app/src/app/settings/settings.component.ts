import { ChartStore } from './../store/chart.store';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartFormComponent } from './chart-form/chart-form.component';
import { Chart } from '../modals/chart';
import { ConfirmationMessageComponent } from '../shared/confirmation-message/confirmation-message.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatSnackBarModule],
})
export class SettingsComponent {
  chartStore = inject(ChartStore);
  displayedColumns: string[] = ['name', 'type', 'actions'];
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  openUpdateDialog(chart: Chart): void {
    const dialogRef = this.dialog.open(ChartFormComponent, {
      width: '600px', data: chart
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result) {
        if(!!result.id) {
          this.chartStore.updateChart(result)
          this.displayMessage('Chart updated successfully.');
        } else {
          result.id = this.genarateRandomId();
          this.chartStore.addToList(result)
          this.displayMessage('Chart added successfully.');
        }
      }
    });
  }

  openDeleteConfirmation(id: string) {
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result) {
        if(result) {
          this.chartStore.removeChart(id);
          this.displayMessage('Chart deleted successfully.');
        }
      }
    });
  }

  addChart() {
    this.openUpdateDialog({} as Chart)
  }

  genarateRandomId() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  displayMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

}
