import { DataService } from './../../service/data.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StudentDto,CreateStudentDto } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss']
})
export class StudentFormDialogComponent {
  studentForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  loading = false;
  isAddMode: boolean;
  initialFormValues!: any;
  imageTouched: boolean = false;
  yesterday: Date;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentFormDialogComponent>,
    private DataService: DataService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      mode: 'add' | 'edit';
      student?: StudentDto;
    }
  ) {
    this.isAddMode = data.mode === 'add';
    this.imagePreview = data.student?.imageUrl || null;
    const today = new Date();
    this.yesterday = new Date(today.setDate(today.getDate() - 1));
    
    this.studentForm = this.fb.group({
      firstName: [data.student?.firstName || '', Validators.required],
      lastName: [data.student?.lastName || '', Validators.required],
      mobile: [data.student?.mobile || '', [Validators.required,Validators.pattern(/^\d{10}$/)]],
      email: [data.student?.email || '', [Validators.required, Validators.email]],
      nic: [data.student?.nic || '', Validators.required],
      dateOfBirth: [data.student?.dateOfBirth || '', Validators.required],
      address: [data.student?.address || '', Validators.required],
      imageUrl: [data.student?.imageUrl || '']
    });
    this.initialFormValues = this.studentForm.value;
  }

  onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          this.imagePreview = reader.result; // Show preview
          this.studentForm.patchValue({ imageUrl: reader.result }); // Add to form
        };

        reader.readAsDataURL(file);
      }
  }

  onSubmit(): void {
    const formData = this.studentForm.value;
    // Create student object without image URL for now
    if(this.imagePreview === null) {
      this.toastr.error('Please select an image for the student.');
    }else{
      
      this.loading = true;
      if (this.isAddMode) {
        const studentData: CreateStudentDto = {
          ...formData,
          imageUrl: this.imagePreview?.toString() || ''
        };
        console.log('newStudent saving Data:', studentData);
        this.DataService.addStudent(studentData).subscribe({
          next: (savedStudent) => {
            this.loading = false;
            this.dialogRef.close(savedStudent);
            this.toastr.success('Successfully saved student!');
          },
          error: (err) => {
            console.error('Error saving student:', err);
            this.loading = false;
            this.toastr.error('Failed to save student. Please try again.');
          }
        });
      } 
      else {
        const studentData: StudentDto = {
        ...formData,
        id: this.data.student?.id || 0,
        imageUrl: this.imagePreview?.toString() || ''
      };
        this.DataService.updateStudent(studentData).subscribe({
          next: (updatedStudent) => {
            this.loading = false;
            this.dialogRef.close(updatedStudent);
            this.toastr.success('Successfully updated student!');
          },
          error: (err) => {
            console.error('Error updating student:', err);
            this.loading = false;
            this.toastr.error('Failed to update student. Please try again.');
          }
        });
      }
    }
  }

  isFormDirty(): boolean {
    return JSON.stringify(this.studentForm.value) !== JSON.stringify(this.initialFormValues);
  }
}
