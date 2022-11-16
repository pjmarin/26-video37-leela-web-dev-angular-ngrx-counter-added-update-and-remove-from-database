import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";
import { PostsState } from "./posts.state";

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, state => {
    return state.posts;
});

// export const getPostById = createSelector(getPostsState, (state: PostsState, props: Post): Post | undefined  => {
//     const postFound = state.posts.find((post: Post) => post.id === props.id)
//     return postFound;
// });

// to get rid of the deprecated warning, a solution could be - (NOT WORKING)

// const getPostById = (props: { id: string }) => {
//     return createSelector(getPostsState, (state) =>
//         state.posts.find((post) => post.id === props.id)
//     );
// }

export const getPostById = createSelector(getPostsState, (state: PostsState, props: Partial<Post>): Post | undefined  => {
    return state.posts.find((post: Post) => post.id === props.id);     
});