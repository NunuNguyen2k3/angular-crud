export class EmplyeeModel {
    empId: number;
    name : string;
    city : string;
    state: string;
    emailID: string;
    contactNo: string;
    address: string;
    pinCode: string;

    constructor(
        empId: number = 0,
        name: string = '',
        city: string = '',
        state: string = '',
        emailID: string = '',
        contactNo: string = '',
        address: string = '',
        pinCode: string = ''
      ) {
        this.empId = empId;
        this.name = name;
        this.city = city;
        this.state = state;
        this.emailID = emailID;
        this.contactNo = contactNo;
        this.address = address;
        this.pinCode = pinCode;
      }
}