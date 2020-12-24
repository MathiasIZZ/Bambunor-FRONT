import { Component, OnInit } from '@angular/core';
import { ParallaxConf } from './parallax-config';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';
import { animations } from './animations';

interface Position {
  left: string;
  top: string;
}

interface Star {
  img: string;
  position: Position;
  conf: IParallaxScrollConfig;
}



@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  animations: animations
})
export class PresentationComponent implements OnInit {

  title = 'ng-example-parallax';

  private minStarsCount: number = 10;
  private maxStarsCount: number = 30;
  stars: Array<Star> = [];

  constructor() { }

  ngOnInit(): void {}

  generateStars() {
    for (let index = 0; index < this.generatedRandomStarsCount(); index++) {
      this.stars.push({
        img: `https://multisys.fr/wp-content/uploads/2017/08/%C3%A9toile.png`,
        position: this.generatePosition(),
        conf: new ParallaxConf()
      });
    }
  }

  generatePosition(): Position {
    return {
      left: `${this.mathRandom(100)}%`,
      top: `${this.mathRandom(200)}%`
    };
  }

  AllowAllUser(id.user): void {

}


mathRandom(endpoint: number): number {
  return Math.round(Math.random() * endpoint);
}

generatedRandomStarsCount(): number {
  return Math.floor(
    Math.random() * (this.maxStarsCount - this.minStarsCount + 1) + this.minStarsCount
  );
}

onGalaxyGenerate() {
  this.stars = [];
  this.generateStars();
}


}
