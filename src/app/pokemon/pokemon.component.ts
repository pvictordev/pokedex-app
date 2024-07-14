import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {

  pokemon: any;
  evolutionChain: any; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.getPokemon(id);
      this.getPokemonSpecies(id)
      this.getEvolutions(this.evolutionChain);
    }

  }

  getPokemon(id: string): void {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    this.httpClient.get(url).subscribe((data: any) => {
      this.pokemon = data;
    });
  }

  // methods to get evolution chain of the particular pokemon

  getPokemonSpecies(id: string): void {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`; 
    this.httpClient.get(url).subscribe((data: any) => {
      this.getEvolutionChain(data.evolution_chain.url);
    });
  }

  getEvolutionChain(url: string): void {
    this.httpClient.get(url).subscribe((data: any) => {
      this.evolutionChain = data.chain;
      console.log(this.evolutionChain);
    });
  }

  getEvolutions(chain: any): any[] {
    let evolutions = [];
    let currentChain = chain;

    while (currentChain) {
      evolutions.push({ name: currentChain.species.name, url: currentChain.species.url });
      currentChain = currentChain.evolves_to[0];
    }
    return evolutions;
  }

  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }
  
}
