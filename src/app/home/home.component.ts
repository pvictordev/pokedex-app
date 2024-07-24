import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  searchItem: string = '';
  allPokemons: any[] = [];
  filteredPokemons: any[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadAllPokemons();
  }

  loadAllPokemons(): void {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
    this.httpClient.get(url).subscribe((response: any) => {
      this.allPokemons = response.results;
      this.filteredPokemons = this.allPokemons;
    });
  }

  onSearch(): void {
    const searchItemLower = this.searchItem.toLowerCase().trim();
    this.filteredPokemons = this.allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().startsWith(searchItemLower)
    );
  }

  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }

}


