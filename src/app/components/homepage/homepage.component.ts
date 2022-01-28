import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public _httpService: HttpService) { }

  ngOnInit(): void {
  }

  pokemons = [];

  getPokemon() {
    this._httpService.getPokemon().subscribe( (data) => {
      console.log("data", data);
      // this.pokemons = data.results;
      data.results.forEach((pokemon)=>{this.getPokemonDetails(pokemon.name)});
      console.log("this.pokemons:", this.pokemons);
    });
  }

  getPokemonDetails(pokemon) {
    this._httpService.getPokemonDetails(pokemon).subscribe((data)=>{
      this.pokemons.push(data);
    });
  }

}
