export class Customer {
    id:number;
    name:String;
    lastName:String;
    sexo:String;
    email:String;

    toString(){
        return this.name + ' ' + this.lastName;
    }
}
