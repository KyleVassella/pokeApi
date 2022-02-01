import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public _httpService: HttpService) { }

  ngOnInit(): void {
    // this.pokemonsLoaded = false;
    this.getPokemon();
  }

  // pokemonsLoaded: boolean;
  pokemons$: Observable<any>;
  // pokemons = [];


  twoWayProperty: string = "two way data binding"


  getPokemon() {
    this.pokemons$ = this._httpService
      .getPokemon()
      .pipe(
        switchMap((data: any) =>
          forkJoin(
            data.results.map((pokemon: any) =>
              this._httpService.getPokemonDetails(pokemon.url)
            )
          )
        )
      );
  }
}
