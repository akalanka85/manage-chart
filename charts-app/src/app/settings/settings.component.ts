import { ChartStore } from './../store/chart.store';
import { Component, inject, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [MatTableModule],
})
export class SettingsComponent implements OnInit {
  chartStore = inject(ChartStore)
  displayedColumns: string[] = ['name', 'type'];
  constructor() { }

  ngOnInit() {
    console.log(this.chartStore.chartData())
  }

}
