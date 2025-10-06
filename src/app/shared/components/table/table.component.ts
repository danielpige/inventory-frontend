import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TableAction } from '../../../core/models/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() hasActions = false;
  @Input() hasPagination = false;
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() loading = false;
  @Input() actionList: TableAction[] = [];
  @Output() changePagination = new EventEmitter<PageEvent>();
  @Output() rowSelected = new EventEmitter<any>();
  @Output() actionSelected = new EventEmitter<any>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.hasActions) {
      this.displayedColumns.push('Acciones');
    }
  }

  selectedRow(data: any): void {
    this.rowSelected.emit(data);
  }

  changePage(eventPagination: PageEvent): void {
    this.changePagination.emit(eventPagination);
  }

  selectedAction(event: string, data: any): void {
    this.actionSelected.emit({ event, ...data });
  }
}
