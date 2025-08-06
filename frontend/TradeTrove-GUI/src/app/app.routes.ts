import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ScreenerComponent } from './components/screener/screener.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { AboutComponent } from './components/about/about.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StockPageComponent } from './components/stock-page/stock-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'home', component:HomeComponent},
  {path:'screener', component:ScreenerComponent},
  {path:'watch-list', component:WatchlistComponent},
  {path:'about' , component:PageNotFoundComponent},
  {path:'contact-us', component:PageNotFoundComponent},
  {path:'profile', component:ProfileComponent},
  {path:'stock', component:StockPageComponent},
  {path: '**', component:PageNotFoundComponent}
];
