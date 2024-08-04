import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

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
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.loadTypesDetails(id);
      this.loadTypesId(id);
    }
  }

  loadTypesDetails(id: string): void {
    this.apiService.getType(id).subscribe({
      next: (data) => {
        this.typesDetails = data.pokemon;
        this.filteredTypesDetails = this.typesDetails;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadTypesId(id: any): void {
    this.apiService.getAllTypes().subscribe({
      next: (data) => {
        const index = id - 1;

        if (index >= 0 && index < data.results.length) {
          this.typesName = data.results[index];
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSearch(): void {
    const searchItemLower = this.searchItem.toLowerCase().trim();
    if (searchItemLower) {
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
