import { Routes } from '@angular/router';
import { TypesComponent } from './types/types.component';
import { HomeComponent } from './home/home.component';
import { TypesDetailsComponent } from './types-details/types-details.component';
import { PokemonComponent } from './pokemon/pokemon.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent
    },
    {
        path: 'types', 
        component: TypesComponent
    },
    {
        path: 'types/:id', 
        component: TypesDetailsComponent
    },
    {
        path: 'pokemon/:id', 
        component: PokemonComponent
    },
];
