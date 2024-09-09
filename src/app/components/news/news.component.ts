import { Component, OnInit } from '@angular/core';
import { NewsInterface } from '../../interfaces/news-interface';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {

  public news: Array<NewsInterface> = [];
  public newNews: NewsInterface = {
    title: "",
    description: "",
    date: "",
    content: "",
    auth: "",

  };

  public showForm: boolean = false;
  public isLiked: boolean = false;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.newsService.getNews().subscribe({
      next: (data: NewsInterface[]) => {
        this.news = data
          .filter(newsItem => (newsItem.likes ?? []).length === 0)
          .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

            return dateB - dateA;
          });

      },
      error: (error) => {
        console.error('Error fetching news:', error);
      }
    });
  }

  createNews() {
    this.newsService.createNews(this.newNews).subscribe({
      next: (data) => {
        this.news.unshift(data);
        this.news.sort((a, b) => {

          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

          return dateB - dateA;
        });
        this.newNews = { title: '', description: '', content: '', date: "", auth: '' };
        this.showForm = false;

      },
      error: (error) => {
        console.error('Error creando noticia:', error);
      }
    });
  }


  async deleteNews(newsId: string) {
    const noticia = await this.newsService.deleteNews(newsId);

    if (!noticia.error) {
      this.getNews();
    } else {
      console.log(noticia.error);

    }

  }

  likeNews(newsId: string) {
    this.newsService.likeNews(newsId).subscribe({
      next: () => {
        const index = this.news.findIndex(news => news._id === newsId);
        if (index !== -1) {
          this.getNews();
        }
      },
      error: (error) => {
        console.error('Error al dar like:', error);
      }
    });

  }

  notLikeNews(newsId: string) {
    this.newsService.notLikeNews(newsId).subscribe({
      next: () => {
        const index = this.news.findIndex(news => news._id === newsId);
        if (index !== -1) {
          this.getNews();
        }
      },
      error: (error) => {
        console.error('Error al dar like:', error);
      }
    });

  }

  
  toggleForm() {
    this.showForm = !this.showForm;
  }


  toggleLike(newsId: string) {
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      this.likeNews(newsId);
    } else {
      this.notLikeNews(newsId);
    }
  }

}






