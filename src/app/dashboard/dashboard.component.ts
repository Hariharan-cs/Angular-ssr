import { isPlatformBrowser } from '@angular/common';
import { APP_ID, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  platform: boolean = false;
  constructor(private heroService: HeroService,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {
    this.platform = isPlatformBrowser(platformId)
   }

  ngOnInit() {
    if(this.platform)
      this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        console.log('heroes', heroes)
        this.heroes = heroes && heroes.slice(1, 5)
      });
  }
}
