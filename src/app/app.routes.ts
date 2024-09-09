import { Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { ArchivedComponent } from './components/archived/archived.component';

export const routes: Routes = [
    {path:"", component:NewsComponent},
    {path:"archived", component:ArchivedComponent},
    { path: '', redirectTo: '/news', pathMatch: 'full' },
    
];
