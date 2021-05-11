import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [SocialSharing],
})
export class HomePage implements OnInit {
  offset? = 0;
  pokemon? = [];

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(
    private pokeService: PokemonService,
    private socialSharing: SocialSharing,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon = (loading: Boolean = false, event?) => {
    if (loading) this.offset += 25;

    this.pokeService.getPokemon(this.offset).subscribe((res) => {
      this.pokemon = [...this.pokemon, ...res];

      if (event) {
        event.target.complete();
      }
    });
  };

  handleSearchReq = (e) => {
    let value = e.detail.value;

    if (value === '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokeService.findPokemon(value).subscribe(
      (res) => {
        this.pokemon = [res];
      },
      (err) => {
        this.pokemon = [];
      }
    );
  };

  refreshData = (event) => {
    console.log('Begin refresh!');
    this.pokemon = [];
    this.offset = 0;
    this.loadPokemon();
    this.presentToastWithOptions();
    event.target.complete();
    return;
  };

  presentToastWithOptions = async () => {
    const toast = await this.toastController.create({
      header: 'Data refreshed',
      message: 'Click to Close',
      position: 'bottom',
      buttons: [
        {
          text: 'Close',
          role: 'close',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
      duration: 2500, // 2.5 secs
      translucent: true,
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  };

  shareRepoUsingEmail = () => {
    this.socialSharing
      .canShareViaEmail()
      .then(() => {
        console.log('Sharing via email is possible');

        this.socialSharing
          .shareViaEmail(
            'Pokdex using Ionic => https://github.com/VatsalNarwal/Pokdex-Ionic',
            'Pokedex',
            ['']
          )
          .then(() => {
            console.log('Shared using email');
          })
          .catch(() => {
            console.error("Couldn't share using email");
          });
      })
      .catch(() => {
        console.error('Sharing via email is not possible');
      });
  };

  shareViaWhatsApp = () => {
    this.socialSharing
      .shareViaWhatsApp(
        'Pokdex using Ionic and Angular',
        'https://cdn2.bulbagarden.net/upload/thumb/3/36/479Rotom-Pok%C3%A9dex.png/250px-479Rotom-Pok%C3%A9dex.png',
        'https://github.com/VatsalNarwal/Pokdex-Ionic'
      )
      .then(() => {
        console.log('Shared using whatsapp');
      })
      .catch((e) => {
        console.error("Couldn't share using whatsapp");
      });
  };

  shareViaInstagram = () => {
    this.socialSharing
      .shareViaInstagram(
        'Pokdex using Ionic and Angular => https://github.com/VatsalNarwal/Pokdex-Ionic',
        'https://cdn2.bulbagarden.net/upload/thumb/3/36/479Rotom-Pok%C3%A9dex.png/250px-479Rotom-Pok%C3%A9dex.png'
      )
      .then(() => {
        console.log('Shared using Instagram');
      })
      .catch((e) => {
        console.error("Couldn't share using Instagram");
      });
  };

  shareViaFacebook = () => {
    this.socialSharing
      .shareViaFacebook(
        'Pokdex using Ionic and Angular',
        'https://cdn2.bulbagarden.net/upload/thumb/3/36/479Rotom-Pok%C3%A9dex.png/250px-479Rotom-Pok%C3%A9dex.png',
        'https://github.com/VatsalNarwal/Pokdex-Ionic'
      )
      .then(() => {
        console.log('Shared using Facebook');
      })
      .catch((e) => {
        console.error("Couldn't share using Facebook");
      });
  };
  
  shareViaTwitter = () => {
    this.socialSharing
      .shareViaTwitter(
        'Pokdex using Ionic and Angular',
        'https://cdn2.bulbagarden.net/upload/thumb/3/36/479Rotom-Pok%C3%A9dex.png/250px-479Rotom-Pok%C3%A9dex.png',
        'https://github.com/VatsalNarwal/Pokdex-Ionic'
      )
      .then(() => {
        console.log('Shared using Twitter');
      })
      .catch((e) => {
        console.error("Couldn't share using Twitter");
      });
  };

  appName: String = 'Pokémon Dexter';
}
