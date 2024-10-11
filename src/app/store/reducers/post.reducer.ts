import { createReducer, on } from '@ngrx/store';
import { loadPostsSuccess, addPostSuccess, updatePostSuccess, deletePostSuccess, addPostFailure, updatePostFailure, deletePostFailure } from '../actions/post.actions';
import { PostResponse } from '../../models/PostResponse';

export interface PostState {
  posts: PostResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null
};

export const postReducer = createReducer(
  initialState,
  
  // Succès du chargement des posts
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    loading: false,
    error: null
  })),

  // Succès de l'ajout de post
  on(addPostSuccess, (state, { post }) => ({
    ...state,
    posts: [...state.posts, post],
    error: null
  })),
  
  // Échec de l'ajout de post
  on(addPostFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Succès de la mise à jour de post
  on(updatePostSuccess, (state, { post }) => ({
    ...state,
    posts: state.posts.map(p => p.id === post.id ? post : p),
    error: null
  })),

  // Échec de la mise à jour de post
  on(updatePostFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Succès de la suppression de post
  on(deletePostSuccess, (state, { postId }) => ({
    ...state,
    posts: state.posts.filter(p => p.id !== postId),
    error: null
  })),

  // Échec de la suppression de post
  on(deletePostFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
