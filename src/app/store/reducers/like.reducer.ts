// like.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addLike, removeLike } from "../actions/like.actions"
import { LikeResponse } from '../../models/PostResponse';

export interface LikeState {
  likes: LikeResponse[];
}

const initialState: LikeState = {
  likes: []
};

export const likeReducer = createReducer(
  initialState,
  on(addLike, (state, { like }) => ({
    ...state,
    likes: [...state.likes, like]
  })),
  on(removeLike, (state, { likeId }) => ({
    ...state,
    likes: state.likes.filter(l => l.id !== likeId)
  }))
);
