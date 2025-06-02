import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentFormDialogComponent } from 'src/app/Popups/student-form-dialog/student-form-dialog.component';
import { StudentDto } from '../../models/student.model';
import { DataService } from './../../service/data.service';
import { ConfirmationDialogComponent } from 'src/app/Popups/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-table-detail',
  templateUrl: './user-table-detail.component.html',
  styleUrls: ['./user-table-detail.component.scss']
})
export class UserTableDetailComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'mobile', 'email', 'nic', 'actions'];
  selectedIndex: number = -1;
  selectedUser: StudentDto | null = null;
  dataSource = new MatTableDataSource<StudentDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const totalRows = this.dataSource.data.length;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      this.selectedIndex = (this.selectedIndex + 1) % totalRows;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      this.selectedIndex = (this.selectedIndex - 1 + totalRows) % totalRows;
    } else {
      return;
    }
    this.selectedUser = this.dataSource.data[this.selectedIndex];
    event.preventDefault();
  }

  constructor(
    public dialog: MatDialog,
    private DataService: DataService,
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRowClicked(user: StudentDto, index: number) {
    if (this.selectedUser && this.selectedUser.id === user.id) {
      this.selectedUser = null;
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
      this.selectedUser = user;
    }
  }

  onAddStudent() {
    const dialogRef = this.dialog.open(StudentFormDialogComponent, {
      data: {
        mode: 'add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onUpdate(user: StudentDto) {
    console.log("Update :",user)
    const dialogRef = this.dialog.open(StudentFormDialogComponent, {
      data: {
        mode: 'update',
        student: user
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        console.log("result :",result)
        this.loadStudents();

    });
  }

  loadStudents() {
    this.DataService.getAllStudents().subscribe({
      next: (students) => {
        this.dataSource.data = students;
        console.log('Students loaded:', students);
      },
      error: (err) => {
        console.error('Error fetching students:', err);
      }
    });
  }

  onDelete(user: StudentDto) {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.DataService.deleteStudent(user.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(s => s.id !== user.id);
          if (this.selectedUser && this.selectedUser.id === user.id) {
            this.selectedUser = null;
            this.selectedIndex = -1;
          }
        },
        error: (err) => {
          console.error('Error deleting student:', err);
          alert('Failed to delete student.');
        }
      });
    }
  });
  }
}
