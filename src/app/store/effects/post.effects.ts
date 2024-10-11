import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../services/post.service';
import { 
  loadPosts, loadPostsSuccess, loadPostsFailure, // ajout de loadPostsFailure
  addPost, addPostSuccess, addPostFailure,
  updatePost, updatePostSuccess, updatePostFailure,
  deletePost, deletePostSuccess, deletePostFailure
} from '../actions/post.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PostEffects {

  constructor(
    private actions$: Actions,
    private postService: PostService
  ) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() => this.postService.getAllPosts()
        .pipe(
          map(posts => loadPostsSuccess({ posts })),
          catchError(error => of(loadPostsFailure({ error }))) // Correction ici
        )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPost),
      mergeMap(action => this.postService.createPost(action.post)
        .pipe(
          map(post => addPostSuccess({ post })),
          catchError(error => of(addPostFailure({ error })))
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      mergeMap(action => this.postService.updatePost(action.postId, action.post)
        .pipe(
          map(post => updatePostSuccess({ post })),
          catchError(error => of(updatePostFailure({ error })))
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      mergeMap(action => this.postService.deletePost(action.postId)
        .pipe(
          map(() => deletePostSuccess({ postId: action.postId })),
          catchError(error => of(deletePostFailure({ error })))
        )
      )
    )
  );
}
