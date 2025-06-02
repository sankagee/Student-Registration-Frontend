import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateStudentDto,  StudentDto } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7137/api/students'; 

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(this.apiUrl);
  }

  addStudent(student: CreateStudentDto): Observable<CreateStudentDto> {
  return this.http.post<CreateStudentDto>(`${this.apiUrl}`, student);
  }

  updateStudent(student: StudentDto): Observable<void> {
    console.log('Updating student:', student);
    return this.http.put<void>(`${this.apiUrl}`, student);
  }
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
