import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './types.component.html',
  styleUrl: './types.component.css'
})
export class TypesComponent implements OnInit {
  httpClient = inject(HttpClient);

  types:any = [];
  ngOnInit(): void {
    this.getTypes()
  }

  getTypes() {
    this.httpClient.get('https://pokeapi.co/api/v2/type').subscribe((data: any) => {
      this.types = data.results;
    })
  } 
  
}
