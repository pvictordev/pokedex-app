import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-types-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './types-details.component.html',
  styleUrl: './types-details.component.css'
})
export class TypesDetailsComponent {

  searchItem: string = ''; 
  typesDetails: any;
  filteredTypesDetails: any[] = [];
  typesName: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getTypesDetails(id);
      this.getTypesId(id); 
    }
  }

  getTypesDetails(id: string): void {
    const url = `https://pokeapi.co/api/v2/type/${id}`;
    this.httpClient.get(url).subscribe((data: any) => {
      this.typesDetails = data.pokemon;
      this.filteredTypesDetails = this.typesDetails;
    });
  }

  getTypesId(id: any): void {
    const url = `https://pokeapi.co/api/v2/type`;
    this.httpClient.get(url).subscribe((data: any) => {

      const index = id - 1;
  
      if (index >= 0 && index < data.results.length) {
        this.typesName = data.results[index];
      } else {
        console.log(`No object found at index ${id}.`);
      }
    });
  }

  onSearch():void {
    const searchItemLower = this.searchItem.toLowerCase().trim();
    if(searchItemLower) {
      this.filteredTypesDetails = this.typesDetails.filter((type: { pokemon: { name: string; }; }) =>
        type.pokemon.name.toLowerCase().startsWith(searchItemLower)
      );
    } else { this.filteredTypesDetails = this.typesDetails } 
  }

  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }
 
}
