import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { PollsService } from './polls.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    public dialog: MatDialog,
    public pollsService: PollsService
    ) { }

  displayedColumns: string[] = ['title', 'url', 'created_at', 'author'];
  dataSource: any
  interval: any

  ngOnInit() {
    this.showData()

    this.setNewInterval()
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  showData() {
    this.pollsService.get()
      .subscribe((data: {}) => {
        this.dataSource = new MatTableDataSource(data['hits']);
      });
  }

  setNewInterval(){
    this.interval = setTimeout(()=>{this.showData()}, 10000);
  }

  title = 'git-demo';
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(row): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }
}
