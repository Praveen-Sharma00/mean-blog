import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http.get<{ message: string, data: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.data.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(
        (transformedResponse) => {
          this.posts = transformedResponse;
          this.postUpdated.next([...this.posts]);
        });
  }


  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: any = {title, content};
    this.http.post('http://localhost:3000/api/posts', post)
      .subscribe((response: any) => {
        this.posts.push(response.data);
        this.postUpdated.next([...this.posts]);
      });

  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe((response) => {
        const updatedPosts: Post[] = this.posts.filter(post => post.id !== postId);
        this.postUpdated.next([...updatedPosts]);
      });
  }
}
