import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  public inputsGastos : FormGroup;
  public valid : boolean = true;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {

    this.inputsGastos = this.fb.group({
      gasto: ['', Validators.required],
      cantidad: ['', Validators.required]
    })

  }

  agregarGasto(){
    if ( !this.inputsGastos.valid ){
     return this.valid = false;
    }else {
      this.valid = true;
    };
   
    const { gasto, cantidad } = this.inputsGastos.value;

    const registroGasto = {
      gasto,
      cantidad 
    }

    console.log(registroGasto);
    
  }



  regresar(){
  
  }

}
