import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { SearchComponent } from './pages/search/search.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path:'listado',
        component: ListadoComponent
      },
      {
        path:'agregar',
        component: AgregarComponent
      },
      {
        path:'editar/:id',
        component: AgregarComponent
      },
      {
        path:'buscar',
        component: SearchComponent
      },
      {
        path:':id',
        component: HeroeComponent
      },
      {
        path:'**',
        redirectTo: 'listado'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
