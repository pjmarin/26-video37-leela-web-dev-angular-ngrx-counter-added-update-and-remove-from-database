import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { CounterComponent } from "./counter/counter/counter.component"; // this was before implementing lazy loading
import { HomeComponent } from "./home/home.component";
// import { AddPostComponent } from "./posts/add-post/add-post.component"; // this was before implementing lazy loading
// import { EditPostComponent } from "./posts/edit-post/edit-post.component"; // this was before implementing lazy loading
// import { PostsListComponent } from "./posts/posts-list/posts-list.component"; // this was before implementing lazy loading

const routes: Routes = [
    { path: "", component: HomeComponent },
    // { path: "counter", component: CounterComponent }, // this was before implementing lazy loading
    { path: "counter", loadChildren: () => import("./counter/counter.module").then(m => m.CounterModule) },
    // { path: "posts", // this was before implementing lazy loading
    //   component: PostsListComponent,
    //   children: [
    //     { path: "add", component: AddPostComponent },
    //     { path: "edit/:id", component: EditPostComponent }
    //   ]
    // }
    { path: "posts", loadChildren: () => import("./posts/posts.module").then(m => m.PostsModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}