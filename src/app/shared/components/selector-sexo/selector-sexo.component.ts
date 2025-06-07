import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input  } from '@angular/core';


@Component({
  selector: 'app-selector-sexo',
  templateUrl: './selector-sexo.component.html',
})
export class SelectorSexoComponent implements OnInit  {

  
  items:any=[];
  seleccionado:any={};
  @Input() valor:any={};
  @Output() filtroSeleccionado:EventEmitter<any> =new EventEmitter<any>();

  
  constructor() { }
 
  onChange(event) {   
    this.filtroSeleccionado.emit(event.value);        
  }

  ngOnInit(): void {
      this.getDatos();     
      this.seleccionado=this.valor;
  }

  getDatos(){
  this.items=[
    { codigo: 'M', nombre:"Macho"},
    { codigo: 'H', nombre:"Hembra" },   
  ];
  }
}
