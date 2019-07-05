import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css']
})
export class HomeCustomerComponent implements OnInit {

  private customer: Customer = new Customer();
  public customerId: number;

  constructor(private router: Router, private service: CustomerService) { }

  ngOnInit() {
    // Inicializo para que cuando modifique no me autocomplete el formulario con la data del modificado.
    this.service.setCustomer(this.customer);
  }

  listarCustomer() {
    this.router.navigate(["list-customer"]);
  }

  addCustomer(): void {
    this.router.navigate(['add-customer']);
  }

  @Output()
  idCustomer: EventEmitter<number> = new EventEmitter();

  @Output()
  showList: EventEmitter<boolean> = new EventEmitter();

  // Valor seteado por desde el parent component.
  @Input()
  messageFromParent: string;

  public texto: string;

  searchCustomer() {
    this.idCustomer.emit(this.customerId);
    this.texto = "hola desde list-customer " + this.messageFromParent;
    this.showList.emit(true);
    this.router.navigate(["list-customer"]);
  }
}