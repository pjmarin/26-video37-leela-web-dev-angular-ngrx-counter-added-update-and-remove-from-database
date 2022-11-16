import { createReducer, on } from '@ngrx/store';
import { initialState, PostsState } from './posts.state';
import { addPostSuccess, updatePostSuccess, deletePostSuccess, loadPostsSuccess } from './posts.actions';
import { Post } from '../../models/posts.model';

const _postsReducer = createReducer(
    initialState,
    on(addPostSuccess, (state, action) => {
        let post = { ...action.post };
        // Comentar la linea de debajo para mostrar la id de mongo en la tabla del front
        // Tambien deberiamos descomentar la opcion 2 tanto en el service (public/src/app/services/posts.service.ts)
        // como en los effects (public/src/app/posts/state/posts.effects.ts)
        // y dejar comentada la opcion 1
        // Tambien tenemos que tener en el html de post-list.component.html {{ post._id }}, y si queremos ver la id que
        // nosotros asignamos en el front, en lugar de la que viene de mongo, en el post-list.component.html seria {{ post.id }}

        post.id = (state.posts.length + 1).toString(); // con esta instruccion visualizamos la id en el front, no la de mongo sino la que nosotros le asignamos en el front

        return {
            ...state,
            posts: [ ...state.posts, post ]
        };
    }),
    on(updatePostSuccess, (state, action) => {
      const updatedPosts: Post[] = state.posts.map((post: Post) => {
          // return action.post.id === post.id ? action.post : post;
          return action.post._id === post._id ? action.post : post;
      });

      return {
          ...state,
          posts: updatedPosts
      };
    }),
    on(deletePostSuccess, (state: PostsState, { id }: { id: string }) => {
      const updatedPosts = state.posts.filter((post) => {
        // return post.id !== id;
        return post._id !== id;
      });
  
      return {
        ...state,
        posts: updatedPosts,
      };
    }),
    on(loadPostsSuccess, (state, action) => {
      return {
        ...state,
        posts: action.posts,
      };
    })
);

export function postsReducer(state: PostsState = initialState, action: any) {
  return _postsReducer(state, action);
}