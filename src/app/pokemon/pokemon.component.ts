import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {

  pokemon: any;
  evolutionChain: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.loadPokemon(id);
      this.loadPokemonSpecies(id)
      this.getEvolutions(this.evolutionChain);
    }
  };

  loadPokemon(id: string): void {
    this.apiService.getPokemon(id).subscribe({
      next: (data) => {
        this.pokemon = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  };

  // methods to get evolution chain of the particular pokemon

  // get species, because species contains evolution chain 
  loadPokemonSpecies(id: string): void {
    this.apiService.getPokemonSpecies(id).subscribe({
      next: (data) => {
        this.loadEvolutionChain(data.evolution_chain.url);
      }
    })
  };

  loadEvolutionChain(url: string): void {
    this.apiService.getEvolutionChain(url).subscribe({
      next: (data) => {
        this.evolutionChain = data.chain;
      }
    })
  };

  getTypeId(): void {

  }

  getEvolutions(chain: any): any[] {
    let evolutions = [];
    let currentChain = chain;

    while (currentChain) {
      evolutions.push({ name: currentChain.species.name, url: currentChain.species.url });
      currentChain = currentChain.evolves_to[0];
    };
    return evolutions;
  };

  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  };

};
