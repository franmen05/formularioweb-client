import { Component, OnInit } from '@angular/core';
import {Client} from './client';
import {ClientService} from './client.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  titulo = 'titulo';
  cliente: Client = new Client();
  errors: string[];

  constructor(private clienteService: ClientService
              // private  router: Router,
              // private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCliente();
    this.titulo = 'Titulo';
    // this.clienteService.getClientes().subscribe(
    //   c=>this.cliente=c
    // );
  }

  public cargarCliente(): void {
    // this.activeRouter.params.subscribe(param => {
    //   const id = param.id;
    //   if (id) {
    //     this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente);
    //   }
    // });
  }

  public create(): void{
    console.log('############ click ############');
    this.clienteService.create(this.cliente).subscribe(
      // response=> this.cliente = response
      r => {
        // this.router.navigate(['/clientes']);
        Swal.fire('Nuevo Cliente', ` Cliente : ${r.name} creado con exito.`, 'success');
      },
      error => {
        this.errors = error.error.errors;
        console.warn('Errores form backend');
        console.warn(this.errors);
        // Swal.fire('Error Cliente',` : ${r.nombre} creado con exito.`,'error')
      }
    );
    console.log(this.cliente);
  }


  public upadte(): void{
    console.log('############ click ############');
    this.clienteService.update(this.cliente).subscribe(
      r => {
        // this.router.navigate(['/clientes']);
        Swal.fire(' Cliente', ` Cliente : ${r.name} actualizado con exito.`, 'success');
      }
    );
    console.log(this.cliente);
  }




}
