import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {

  public inputsIngresos : FormGroup;
  public valid : boolean = true;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {

    this.inputsIngresos = this.fb.group({
      ingreso: ['', Validators.required],
      cantidad: ['', Validators.required]
    })

  }

  agregarIngreso(){
    if ( !this.inputsIngresos.valid ){
     return this.valid = false;
    }else {
      this.valid = true;
    };
   
    const { ingreso, cantidad } = this.inputsIngresos.value;

    const registroGasto = {
      ingreso,
      cantidad 
    }

    console.log(registroGasto);
    
  }



  regresar(){
  
  }

}
