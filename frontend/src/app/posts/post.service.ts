import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPosts() {
    this.http.get<{ message: string, data: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.data.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
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

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post('http://localhost:3000/api/posts', postData)
      .subscribe((response: any) => {
        const newPost = response.data;
        this.posts.push(newPost);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });

  }

  editPost(id: string, title: string, content: string, image: File | string) {
    let postData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      // tslint:disable-next-line:label-position
      postData = {
        id, title, content, imagePath: image
      };
    }

    this.http.put('http://localhost:3000/api/posts/' + id, postData).subscribe((response) => {
      const postIndex = this.posts.findIndex(e => e.id === id);
      console.log({id, title, content, imagePath: image})
      this.posts[postIndex] = {id, title, content, imagePath: image};
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe((response) => {
        const updatedPosts: Post[] = this.posts.filter(post => post.id !== postId);
        this.postUpdated.next([...updatedPosts]);
      });
  }

  getPost(postId: string) {
    return {...this.posts.find(e => e.id === postId)};
  }
}
