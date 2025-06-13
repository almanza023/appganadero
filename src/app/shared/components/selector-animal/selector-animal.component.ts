
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimalService } from 'src/app/core/services/animal.service';

@Component({
  selector: 'app-selector-animal',
  templateUrl: './selector-animal.component.html',
})
export class SelectorAnimalComponent {

  items:any=[];
  seleccionado:any={};
  arraySeleccionado:any=[];
  @Input() valor:any={};
  @Input() disabled:boolean=false;
  @Input() vendido:boolean=false;

  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  selectedCliente:string="";
  constructor(private service: AnimalService) { }

  ngOnInit(): void {
    if(this.vendido){
    this.getAnimalVenta();
    }else{
        this.getAnimalCompra();
    }
    this.seleccionado={};
  }
  getAnimalCompra(){
    this.service.getAnimalesCompra()
    .subscribe(response => {
      this.items=response.data;
      //console.log(response.data)
      } ,error => {
        //console.log( error.error)
      });
  }

   getAnimalVenta(){
    this.service.getAnimalesVenta()
    .subscribe(response => {
      this.items=response.data;
      //console.log(response.data)
      } ,error => {
        //console.log( error.error)
      });
  }

  onChange(event) {
    this.itemSeleccionado.emit(event.value);
  }

  reiniciarComponente(): void {
    this.seleccionado = {}; // Reiniciar el estado del componente hijo
  }

  filtrar(valor:any) {
    if(valor){
     this.seleccionado= this.items.find(objeto => objeto['id'] == valor);
    }
   }




}
