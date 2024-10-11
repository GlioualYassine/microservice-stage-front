// like.actions.ts
import { createAction, props } from '@ngrx/store';
import { LikeResponse } from '../../models/PostResponse';

// Actions pour les likes
export const addLike = createAction('[Like] Add Like', props<{ postId: string, like: LikeResponse }>());
export const removeLike = createAction('[Like] Remove Like', props<{ postId: string, likeId: string }>());
