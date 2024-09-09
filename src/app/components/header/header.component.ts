import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentRoute: string = 'news'; 

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1] || 'news';
    });
  }

  navigate(route: string) {
    this.currentRoute = route;
    this.router.navigate([route]);
  }
}
  

