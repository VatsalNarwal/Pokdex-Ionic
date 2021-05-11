import { Component, OnInit } from '@angular/core';
import { PokemonService } from './../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
  
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  details: any;

  slideOpts = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
  };

  constructor(
    private pokeService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('id');
    this.pokeService.getPokeDetails(index).subscribe((details) => {
      this.details = details;
    });
  }

  pageName: String = 'Details';
}
