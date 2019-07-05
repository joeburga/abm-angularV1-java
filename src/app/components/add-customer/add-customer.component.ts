import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  private customer: Customer;
  public gendersList: string[] = ['M', 'F', 'Others'];

  constructor(private router: Router, private service: CustomerService) { }

  ngOnInit() {
    this.customer = this.service.getCustomer();
  }

  saveCustomer() {
    this.service.createCustomer(this.customer).subscribe(customer => {
      this.customer = customer;
      // En list-customer.ts en el init lo mando siempre al Home.
      // Para que me actualice la lista.
      this.router.navigate(["list-customer"]);
    });
    console.log(this.customer + " Creado Correctamente");
  }

  cancelarCustomer() {
    this.router.navigate(["home-customer"]);
  }

}
