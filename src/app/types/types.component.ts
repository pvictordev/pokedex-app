import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './types.component.html',
  styleUrl: './types.component.css'
})
export class TypesComponent implements OnInit {
  httpClient = inject(HttpClient);

  searchItem: string = '';
  types: any[] = [];
  filteredTypes: any[] = [];

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes(): void {
    this.httpClient.get('https://pokeapi.co/api/v2/type').subscribe((data: any) => {
      this.types = data.results;
      this.filteredTypes = this.types;
    })
  }

  onSearch(): void {
    const searchItemLower = this.searchItem.toLowerCase().trim();
    if (searchItemLower) {
      this.filteredTypes = this.types.filter(type =>
        type.name.toLowerCase().startsWith(searchItemLower)
      );
    } else { this.filteredTypes = this.types }
  }

  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }

}
