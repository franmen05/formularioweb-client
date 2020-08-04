import { Component, OnInit } from '@angular/core';
import {Client} from './client';
import {ClientService} from './client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {

  clientes: Client[];

  constructor(private  clienteService: ClientService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  public delete(c: Client): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Deseas  eliominar Cliente ${c.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
          this.clienteService.delete(c.id).subscribe( r => {

            this.clientes = this.clientes.filter( f => f !== c);
            Swal.fire(
              'Cliente Eliminado!',
              `Cliente ${c.name} elimnado con exito.`,
              'success'
            );
          });
        }
    });
  }

}
