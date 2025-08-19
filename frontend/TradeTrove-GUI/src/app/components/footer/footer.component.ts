import { AfterViewInit, Component } from '@angular/core';
import Aos from 'aos';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements  AfterViewInit {
  ngAfterViewInit(): void {
    Aos.init({
       once: false,
       easing: 'ease',
       mirror: false,
    });
    Aos.refresh();
  }

}
