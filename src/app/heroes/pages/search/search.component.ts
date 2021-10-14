import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../Interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public termino: string = "";
  public heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe( heroes => this.heroes = heroes );
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ){
    this.heroeSeleccionado = undefined;
    if(event.option.value === "") return;

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroeById( heroe.id! )
      .subscribe( heroe => this.heroeSeleccionado = heroe );
  }

}
