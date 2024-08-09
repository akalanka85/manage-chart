import { ChartStore } from './../store/chart.store';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ChartFormComponent } from './chart-form/chart-form.component';
import { IChart } from '../modals/chart';
import { ConfirmationMessageComponent } from '../shared/confirmation-message/confirmation-message.component';
import { environment } from '../../environments/environments';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatTooltipModule],
})
export class SettingsComponent {
  chartStore = inject(ChartStore);
  notificationService: NotificationService = inject(NotificationService);
  displayedColumns: string[] = ['name', 'type', 'actions'];
  chartTypes = environment.chartTypes;

  constructor(public dialog: MatDialog) {}

  openUpdateDialog(chart: IChart): void {
    const dialogRef = this.dialog.open(ChartFormComponent, {
      width: '600px',
      data: chart,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.handleDialogResult(result);
      }
    });
  }

  openDeleteConfirmation(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      data: {
        message: 'Are you sure you want to delete this chart?',
        title: 'Delete Chart',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.chartStore.removeChart(id);
        this.notificationService.showNotification(
          'Chart deleted successfully.'
        );
      }
    });
  }

  addChart(): void {
    this.openUpdateDialog({} as IChart);
  }

  generateRandomId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  getChartType(type: string): string | undefined {
    return this.chartTypes.find((t) => t.value === type)?.name;
  }

  handleDialogResult(result: IChart): void {
    if (!!result.id) {
      this.chartStore.updateChart(result);
      this.notificationService.showNotification('Chart updated successfully.');
    } else {
      result.id = this.generateRandomId().toString();
      this.chartStore.addToList(result);
      this.notificationService.showNotification('Chart added successfully.');
    }
  }
}
