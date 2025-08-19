import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Use provideHttpClient instead of HttpClientModule
import { StockPageComponent } from './app/components/stock-page/stock-page.component';
import Aos from 'aos';

Aos.init({  
  duration: 1000, // Animation duration in milliseconds
  once: true, // Whether animation should happen only once
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
