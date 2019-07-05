import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../Model/Customer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// HttpClient(para hacer las peticiones al API REST por AJAX).
// HttpHeaders(para establecer cabeceras en las peticiones).

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://localhost:8080/api/person';
  // Para que mande solo objeto JSON.
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  // Instancie new Customer() en vez de customer:Customer para que no me tire error undefined, 
  // porque no estaba inicializado.
  private customer = new Customer();

  constructor(private http: HttpClient) {
    console.log("Servicio Customer Funcionando.")
  }

  // Observable; para comunicaciones asíncronas. Este caso de tipo Customer,
  // si no se de que tipo esperar pongo any. 
  getCustomersList(): Observable<Customer[]> {
    return this.http.get(this.url).pipe(
      map(data => data as Customer[])
    );
  }

  getCustomerId(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.url + "/" + id);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.url + "/add", customer, { headers: this.httpHeaders });
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    // return this.http.put<Customer>(this.url+"/"+Customer.id,Customer);
    return this.http.put<Customer>(this.url + "/" + customer.id, customer, { headers: this.httpHeaders });
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(this.url + "/" + id, { headers: this.httpHeaders });
  }

  getCustomer() {
    return this.customer;
  }

  setCustomer(customer: Customer) {
    this.customer = customer;
  }

}
