export interface StudentDto {
  id: number;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  nic: string;
  dateOfBirth: Date;
  address: string;
  imageUrl?: string;
}

export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  nic: string;
  dateOfBirth: Date;
  address: string;
  imageUrl?: string;
}