import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplexOuterSubscriber } from 'rxjs/internal/innerSubscribe';
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

  ngOnDestroy() {

  }

  // pokemonsLoaded: boolean;
  pokemons$: Observable<any>;
  // pokemons = [];


  twoWayProperty: string = "two way data binding"

  // async/await is likely bad form since if one pokemon fails, the entire pokedex fails (wait - or does it? wont it just return an error?). instead, sort after somehow!
  getPokemon() {
    this.pokemons$ = this._httpService
      .getPokemon()
      .pipe(
        switchMap(data: any) => {
          forkJoin(
            data.results.map((pokemon: any) => {
              this._httpService.getPokemonDetails(pokemon.url);
            })
            
          )
        }
      )
    
    
    // this._httpService.getPokemon().subscribe( 
    //     (data) => {
    //       console.warn("next aka data", data);
    //       data.results.forEach((pokemon)=>{this.getPokemonDetails(pokemon.url)});
    //     },
    //   error => console.warn("an observable error occured:", error),
    //   () => console.warn("observable complete!")
    // );
  }

  getPokemonDetails(route) {
    this._httpService.getPokemonDetails(route).subscribe(
      (data)=>{
      // this.pokemons[data.id - 1] = data;
      this.pokemons.push(data);
      // if (data.id === 151) {
      //   this.pokemonsLoaded = true;
      // } 
    }
    );
  }

}
