import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';


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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadAllPokemons();
  }

  loadAllPokemons(): void {
    this.apiService.getAllPokemons('10000').subscribe({
      next: (data) => {
        this.allPokemons = data.results;
        this.filteredPokemons = this.allPokemons
      },
      error: (err) => {
        console.log(err);
      }
    })
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


