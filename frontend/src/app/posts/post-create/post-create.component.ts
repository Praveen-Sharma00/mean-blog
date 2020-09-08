import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from '../post.model';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  public post: Post;
  public postId: string;
  public previewImage: string | ArrayBuffer;
  form: FormGroup;

  constructor(public postService: PostService, public router: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required]})
    });

    this.router.paramMap.subscribe((params: ParamMap) => {
      if (params.has('postId')) {
        this.mode = 'edit';
        this.postId = params.get('postId');
        this.post = this.postService.getPost(this.postId);
        this.form.setValue({title: this.post.title, content: this.post.content, image: this.post.imagePath});
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postService.editPost(this.post.id, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    this.form.reset();
  }

  onFilePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
