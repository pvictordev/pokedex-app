import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableNotification } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getAllPokemons(limit: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    return this.httpClient.get<any>(url);
  }

  getPokemon(id: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.httpClient.get<any>(url);
  }

  getPokemonSpecies(id: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    return this.httpClient.get<any>(url);
  }

  getEvolutionChain(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  getAllTypes(): Observable<any> {
    const url = "https://pokeapi.co/api/v2/type";
    return this.httpClient.get<any>(url);
  }

  getType(id: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/type/${id}`;
    return this.httpClient.get<any>(url);
  }
}
