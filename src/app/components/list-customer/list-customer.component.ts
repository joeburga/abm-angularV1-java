import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { HomeCustomerComponent } from '../home-customer/home-customer.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  public customers: Customer[] = [];
  public listaPorId: number;
  public customer: Customer = new Customer();
  public flag: boolean = false;

  constructor(private router: Router, private service: CustomerService) { }

  ngOnInit() {
    // Para que siempre me mande al home.
    // this.router.navigate(["/home-customer"]);

    this.service.getCustomersList().subscribe(data => (this.customers = data));
  }

  deleteCustomer(customer: Customer): void {
    this.service.deleteCustomer(customer.id).subscribe(data => (
      this.customers.splice(this.customers.indexOf(customer), 1)
    ));
    console.log("Eliminado Correctamente");
  }

  editCustomer(customer: Customer): void {
    this.service.setCustomer(customer);
    this.router.navigate(['edit-customer']);
  }

  cancelCustomer() {
    this.router.navigate(["home-customer"]);
  }

  public copy = [];

  toggleButtonListar(event) {
    console.log("Evento recibido " + event);
    this.listaPorId = event;
    console.log("Evento ID recibido " + this.listaPorId);

    this.service.getCustomerId(this.listaPorId).subscribe(data => this.customer = data);
    console.log(this.customer);

    this.customers.push(this.customer);
    this.customers = this.copy;
    console.log(this.customers);
    
    console.log(this.homeCustomerComponent.texto);
  }

  showListCustomer(event1) {
    this.flag = event1;
    console.log(this.flag);
  }

  @ViewChild(HomeCustomerComponent, {static: false}) homeCustomerComponent : HomeCustomerComponent;

}