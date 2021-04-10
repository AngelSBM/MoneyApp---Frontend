import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {

  saldoInput: FormGroup;

  constructor( private fb : FormBuilder ) { }

  ngOnInit(): void {

    this.saldoInput = this.fb.group({
      saldo: ['aaaaaa']
    });

  }



}
