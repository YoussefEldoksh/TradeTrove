import { routes } from './../../app.routes';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import  Aos  from 'aos';
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit, AfterViewInit {



  router :Router = new Router();
  constructor(router:Router)
  {
    this.router = router;
  }
  ngAfterViewInit(): void {
        Aos.init({
          once: false,
          easing: 'ease',
          mirror: false,
        });
    Aos.refresh();
  }
  ngOnInit(): void {
  }

    goToProfile() {
      this.router.navigate(['screener']);
    }


}
