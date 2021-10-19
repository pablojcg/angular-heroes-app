import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../Interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  public heroe: Heroe = {
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_img:''
  };

  constructor( private heroesService: HeroesService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar,
                public dialog: MatDialog) { }
    
  ngOnInit(): void {

    if( !this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params
    .pipe( 
      switchMap(({ id }) => this.heroesService.getHeroeById( id ))
    )
    .subscribe(heroe => this.heroe = heroe);

  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0 ) return;

    if( this.heroe.id ){
      this.heroesService.updateHeroe(this.heroe)
        .subscribe( heroe => this.showSnackBar('Registro Actualizado'));
    }else{
      this.heroesService.addHeroe(this.heroe)
      .subscribe( heroe => {
        console.log('Respuesta', heroe);
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.showSnackBar('Registro Creado');
      });
    }
  }

  deleteHeroe(){

    const dialog = this.dialog.open( ConfirmComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        console.log(result);
        if(result){
          this.heroesService.deleteHeroe(this.heroe.id!)
          .subscribe( resp => {
            this.router.navigate(['/heroes']);
          });
        }
      }
    )



  }

  showSnackBar( mensaje: string){
    this.snackBar.open(mensaje,'ok!',{
      duration: 2500
    })
  }

}
