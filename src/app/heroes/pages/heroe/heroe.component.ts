import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../Interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute, 
                private heroeService: HeroesService,
                private router: Router ) { }

  ngOnInit(): void {

    // this.activatedRoute.params
    //   .subscribe( ({ id }) => {
    //     this.heroeService.getHeroeById(id)
    //       .subscribe( resp => {
    //         console.log(resp);
    //         this.heroe = resp;
    //       });
    //   });

      this.activatedRoute.params
        .pipe(
          switchMap( ({ id }) => this.heroeService.getHeroeById(id) )
        )
        .subscribe( heroe => this.heroe = heroe);
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
