import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HelpersService } from '../services/helpers.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './types.component.html',
  styleUrl: './types.component.css'
})
export class TypesComponent implements OnInit {

  constructor(private apiService: ApiService, private helpersService: HelpersService) { }

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

  fetchExtractId(url: string): string {
    return this.helpersService.extractId(url);
  }

}
