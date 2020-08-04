import { Injectable } from '@angular/core';
import {Client} from './client';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class ClientService {


  constructor(private  http: HttpClient) { }

  private endPoint = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  getClientes(): Observable<Client[]>{
    // return of(CLIENTES);
    return this.http.get<Client[]>(this.endPoint);
  }

  create(c: Client): Observable<Client>{
    return this.http.post<Client>(this.endPoint, c, {headers: this.httpHeaders}).pipe(
      catchError( e => {

        if (e.status === 400) {
          return throwError(e);
        }


        console.error(e);
        Swal.fire('Error', `No se pudo crear el cliente ${c.name} a causa de :  ${e.error.localizedMessage} `, 'error');
        return throwError(e);
      })
    );
  }

  update(c: Client): Observable<Client>{

    return this.http.put<Client>(`${this.endPoint}/${c.id}`, c, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        console.error(e);
        Swal.fire('Error', `No se pudo actualizar el cliente ${c.name} a causa de :  ${e.error.localizedMessage} `, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Client>{
    return this.http.delete<Client>(`${this.endPoint}/${id}`).pipe(
      catchError( e => {
        console.error(e);
        Swal.fire('Error', `No se pudo eliminar el ID : ${id} a causa de :  ${e.error.localizedMessage} `, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Client>{
    // return of(CLIENTES);
    return this.http.get<Client>(`${this.endPoint}/${id}`).pipe(
      catchError( e => {
        // this.router.navigate(['/clientes']);
        console.error(e);
        Swal.fire('Error', `No se pudo cargar el cliente a causa de :  ${e.error.localizedMessage} `, 'error');
        return throwError(e);
      })
    );
  }

}
