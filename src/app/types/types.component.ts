import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './types.component.html',
  styleUrl: './types.component.css'
})
export class TypesComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  searchItem: string = '';
  types: any[] = [];
  filteredTypes: any[] = [];

  ngOnInit(): void {
    this.loadAllTypes();
  }

  loadAllTypes(): void {
    this.apiService.getAllTypes().subscribe({
      next: (data) => {
        this.types = data.results;
        this.filteredTypes = this.types
      },
      error: (err) => {
        console.log(err);
      }
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
