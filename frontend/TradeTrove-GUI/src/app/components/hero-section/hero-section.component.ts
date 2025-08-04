import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  router :Router = new Router();
  constructor(router:Router)
  {
    this.router = router;
  }

    goToProfile() {
      this.router.navigate(['screener']);
    }
}
