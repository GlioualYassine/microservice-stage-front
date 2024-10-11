import { createAction, props } from '@ngrx/store';
import { PostResponse } from '../../models/PostResponse';

// Actions pour les posts
export const loadPosts = createAction('[Post] Load Posts');
export const loadPostsSuccess = createAction('[Post] Load Posts Success', props<{ posts: PostResponse[] }>());
export const loadPostsFailure = createAction('[Post] Load Posts Failure', props<{ error: any }>()); // Ajout de l'action pour gérer l'erreur de chargement

export const addPost = createAction('[Post] Add Post', props<{ post: PostResponse }>());
export const addPostSuccess = createAction('[Post] Add Post Success', props<{ post: PostResponse }>());
export const addPostFailure = createAction('[Post] Add Post Failure', props<{ error: any }>());

export const updatePost = createAction('[Post] Update Post', props<{ postId: string, post: PostResponse }>());
export const updatePostSuccess = createAction('[Post] Update Post Success', props<{ post: PostResponse }>());
export const updatePostFailure = createAction('[Post] Update Post Failure', props<{ error: any }>());

export const deletePost = createAction('[Post] Delete Post', props<{ postId: string }>());
export const deletePostSuccess = createAction('[Post] Delete Post Success', props<{ postId: string }>());
export const deletePostFailure = createAction('[Post] Delete Post Failure', props<{ error: any }>());
