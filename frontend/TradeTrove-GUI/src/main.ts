import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Use provideHttpClient instead of HttpClientModule
import { StockPageComponent } from './app/components/stock-page/stock-page.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
