import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from '../../models/posts.model';
import { AppState } from '../../store/app.state';
import { updatePost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  // post: Post = { id: "", title: "", description: "" };
  post: Post | undefined = { id: "", title: "", description: "" };
  postForm: FormGroup = new FormGroup({});
  postSubscription: Subscription = Subscription.EMPTY;
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    // this.postSubscription = this.route.paramMap.subscribe(params => {
    //   const id: string | null = params.get("id");
    //   this.store.select(getPostById as any, { id }).subscribe((data: Post | any) => {
    //     this.post = data;
    //   });
    // });

    // Funciona pero no deberia ser asi, el segundo argumento de la linea 30 deberia ser solo { id }
    // this.postSubscription = this.route.paramMap.subscribe(params => {
    //   const id: string = params.get("id") || "";
    //   this.store.pipe(select(getPostById, { id, title: "", description: "" })).subscribe((data?: Post) => {
    //       this.post = data ? data : { id: "", title: "", description: "" };
    // });

    // this.postSubscription = this.route.paramMap.subscribe(params => {
    //   const id: string = params.get("id") || "";
    //   this.store.pipe(select(getPostById, { id } as Post)).subscribe(data => {
    //       this.post = data ? data : { id: "", title: "", description: "" };
    //       this.createForm();
    //   });
    // });

    this.postSubscription = this.route.paramMap.subscribe(params => {
      const id: string = params.get("id") || "";
      // this.store.pipe(select(getPostById, { id })).subscribe(data => {
      //     this.post = data;
      //     this.createForm();
      // });

      this.store.select(getPostById, { id }).subscribe((data: Post | any) => {
        this.post = data;
        this.createForm();
      });
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [ Validators.required, Validators.minLength(6) ]), // null is the initial value of the input with the formControlName "title"
      description: new FormControl(null, [ Validators.required, Validators.minLength(10) ]) // null is the initial value of the input with the formControlName "description"
    });
  }

  onSubmit() {
    if(!this.postForm.valid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post?.id, // obtenemos la id autonumerica que hemos asignado en el front
      _id: this.post?._id, // obtenemos la id de mongo
      title,
      description
    };
    

    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']);
  }

  ngOnDestroy() {
    if(this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

}
