import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmplyeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  employeeForm : FormGroup = new FormGroup({});

  employeeObj: EmplyeeModel = new EmplyeeModel();

  employeeList: EmplyeeModel[] =[];

  isEditMode: boolean = false; 

  constructor() {
    this.createForm();
  
    if (typeof window !== 'undefined' && window.localStorage) {
      const oldData = localStorage.getItem('EmpData');
      if (oldData) {
        try {
          this.employeeList = JSON.parse(oldData) || [];
        } catch (error) {
          console.error('Error parsing data:', error);
        }
      }
    }
  }

  createForm(){
    this.employeeForm = new FormGroup ({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailID: new FormControl(this.employeeObj.emailID),
      pinCode: new FormControl(this.employeeObj.pinCode),
      state: new FormControl(this.employeeObj.state)
    });
  }
  onSave() {
    const oldData = localStorage.getItem("EmpData");
    this.employeeList = oldData ? JSON.parse(oldData) : [];
    
    // Tạo empId duy nhất
    const newId = this.employeeList.length > 0
      ? Math.max(...this.employeeList.map((emp: any) => emp.empId || 0)) + 1
      : 1;
    
    // Xóa empId rỗng từ form và gán empId mới
    const newEmployee = { ...this.employeeForm.value, empId: newId };
    this.employeeList.push(newEmployee);
    
    // Lưu vào LocalStorage
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    console.log('Saved Employee:', newEmployee);
  
    this.resetForm();
  }

  onEdit(empId: number) {
    console.log('Edit button clicked. empId:', empId);
  
    const empToEdit = this.employeeList.find(emp => emp.empId === empId);
    if (empToEdit) {
      console.log('Employee to edit:', empToEdit);
      this.employeeForm.patchValue(empToEdit); // Gán dữ liệu vào form
      this.isEditMode = true; // Chuyển sang chế độ Edit
      console.log('Form Value After Patch:', this.employeeForm.value);
    } else {
      console.error('Employee not found for editing with empId:', empId);
    }
  }

  onUpdate() {
    console.log('Update button clicked. Form Value:', this.employeeForm.value);
  
    const updatedEmp = this.employeeForm.value;
  
    if (!updatedEmp.empId) {
      console.error('Error: empId is missing during update!');
      console.log('Current Form State:', this.employeeForm);
      return;
    }
  
    const index = this.employeeList.findIndex(emp => emp.empId === updatedEmp.empId);
    console.log('Index of employee to update:', index);
  
    if (index !== -1) {
      this.employeeList[index] = { ...updatedEmp, empId: updatedEmp.empId }; // Đảm bảo giữ empId
      console.log('Updated Employee List:', this.employeeList);
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
      console.log('Employee updated:', updatedEmp);
    } else {
      console.error('Employee not found with empId:', updatedEmp.empId);
      console.log('Update button clicked:', { isEditMode: this.isEditMode, formValue: this.employeeForm.value });
    }
  
    this.resetForm();
  }

  onDelete(empId: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      // Lọc ra nhân viên có ID không trùng khớp
      this.employeeList = this.employeeList.filter(emp => emp.empId !== empId);
  
      // Cập nhật LocalStorage
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
  
      console.log(`Deleted Employee with ID: ${empId}`);
      console.log('Remaining Employees:', this.employeeList);
      console.log('Before Delete:', this.employeeList);
      console.log('After Delete:', this.employeeList);
    }
  }
  resetForm() {
    this.employeeForm.reset();
    this.employeeObj = new EmplyeeModel();
    this.isEditMode = false;  // Reset trạng thái khi form trở lại chế độ "Save"
  }
}
