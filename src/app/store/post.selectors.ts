import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './reducers/post.reducer';

// Feature selector for the 'post' state slice
export const selectPostState = createFeatureSelector<PostState>('post');

// Selector to get all posts
export const selectAllPosts = createSelector(
  selectPostState,
  (state: PostState) => state.posts
);

// Selector to get the loading status
export const selectLoading = createSelector(
  selectPostState,
  (state: PostState) => state.loading
);

// Selector to get any errors
export const selectError = createSelector(
  selectPostState,
  (state: PostState) => state.error
);

// Selector to get a post by id
export const selectPostById = (postId: string) => createSelector(
  selectAllPosts,
  (posts) => posts.find((post:any) => post.id === postId)
);
