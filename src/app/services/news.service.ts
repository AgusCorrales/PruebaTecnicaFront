import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, BehaviorSubject } from 'rxjs';
import { NewsInterface } from '../interfaces/news-interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private bdUrl = 'http://localhost:8080/news'



  constructor(private http: HttpClient) { }


  getNews(): Observable<any> {
    return this.http.get(this.bdUrl);
  }

  createNews(news: NewsInterface): Observable<NewsInterface> {
    return this.http.post<NewsInterface>(`${this.bdUrl}`, news);
  }

  deleteNews(newsId: string) {
    return firstValueFrom(
      this.http.delete<any>(`${this.bdUrl}/id/${newsId}`)
    );
  }

  likeNews(newsId: string): Observable<NewsInterface> {
    return this.http.put<NewsInterface>(`${this.bdUrl}/like/${newsId}`, {});
  }

  notLikeNews(newsId: string): Observable<NewsInterface> {
    return this.http.put<NewsInterface>(`${this.bdUrl}/notlike/${newsId}`, {});
  }

  getLikedNews(): Observable<NewsInterface[]> {
    return this.http.get<NewsInterface[]>(`${this.bdUrl}/liked`);
  }


}
