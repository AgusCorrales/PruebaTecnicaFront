import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsInterface } from '../../interfaces/news-interface';
import { NewsService } from '../../services/news.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-archived',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnInit {

  public likedNews: NewsInterface[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getLikedNews();
  }

  getLikedNews() {
    this.newsService.getLikedNews().subscribe({
      next: (data: NewsInterface[]) => {
        this.likedNews = data.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

          return dateB - dateA;
        });
      },
      error: (error) => {
        console.error('Error fetching liked news:', error);
      }
    });
  }

  notLikeNews(newsId: string) {
    this.newsService.notLikeNews(newsId).subscribe({
      next: () => {
        this.getLikedNews(); 
      },
      error: (error) => {
        console.error('Error removing like:', error);
      }
    });
  }

  
}