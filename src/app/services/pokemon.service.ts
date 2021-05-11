import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseUrl: string = 'https://pokeapi.co/api/v2';
  imageUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  constructor(private http: HttpClient) {}

  getPokemon = (offset: number = 0) => {
    return this.http
      .get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map((result) => {
          return result['results'];
        }),
        map((pokemon) => {
          return pokemon.map((poke, index) => {
            poke.image = this.getPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          });
        })
      );
  };

  findPokemon = (query: string | String) => {
    return this.http.get(`${this.baseUrl}/pokemon/${query}`).pipe(
      map((pokemon) => {
        pokemon['image'] = this.getPokeImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon;
      })
    );
  };

  getPokeImage = (index) => {
    return `${this.imageUrl}/${index}.png`;
  };

  getPokeDetails = (index) => {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map((poke) => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map((spriteKey) => poke['sprites'][spriteKey])
          .filter((img) => {
            if (img) {
              if (typeof img === 'string') return img;
            }
          });
        return poke;
      })
    );
  };
}
