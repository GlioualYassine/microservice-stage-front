// comment.actions.ts
import { createAction, props } from '@ngrx/store';
import { CommentResponse } from '../../models/PostResponse';

// Actions pour les commentaires
export const addComment = createAction('[Comment] Add Comment', props<{ postId: string, comment: CommentResponse }>());
export const updateComment = createAction('[Comment] Update Comment', props<{ commentId: string, comment: CommentResponse }>());
export const deleteComment = createAction('[Comment] Delete Comment', props<{ commentId: string }>());
