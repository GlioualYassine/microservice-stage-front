// comment.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addComment, updateComment, deleteComment } from '../actions/comment.actions'
import { CommentResponse } from '../../models/PostResponse';

export interface CommentState {
  comments: CommentResponse[];
}

const initialState: CommentState = {
  comments: []
};

export const commentReducer = createReducer(
  initialState,
  on(addComment, (state, { comment }) => ({
    ...state,
    comments: [...state.comments, comment]
  })),
  on(updateComment, (state, { commentId, comment }) => ({
    ...state,
    comments: state.comments.map(c => c.id === commentId ? comment : c)
  })),
  on(deleteComment, (state, { commentId }) => ({
    ...state,
    comments: state.comments.filter(c => c.id !== commentId)
  }))
);
