import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, ObservableLike, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemon(): Observable<any> {
    return this.http.get(`${this.pokemonsUrl}?limit=151`);
  }

  getPokemonDetails(route): Observable<any> {
    return this.http.get(route);
  }


}
