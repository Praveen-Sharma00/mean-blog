import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http.get<{ message: string, data: Post[] }>('http://localhost:3000/api/posts').subscribe(
      (response) => {
        this.posts = response.data;
        this.postUpdated.next([...this.posts]);
      });
  }


  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title, content};
    this.http.post('http://localhost:3000/api/posts', post)
      .subscribe((response)=>{
        console.log(response)
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });

  }
}
