

import { trigger, transition, style, query, group, animateChild, animate, keyframes } from '@angular/animations';



/*export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'translateX(100%) translate3d(0, 0, 1px)',
        }),
      ]),
      query(':enter', [
        animate('250ms ease', style({
          opacity: 1, transform: 'translateX(0)'})
        ),
      ])
    ]),
]);
*/

export const fader =

  trigger('routeAnimations', [

    transition('<=>* ', [

      style({ opacity: 0 }),

      animate('1000ms ease', style({ opacity: 1 }))
    ]),

    transition(' <=> *', [

      style({ opacity: 0 }),

      animate('1000ms ease', style({ opacity: 1 }))
    ]),
  ]);
