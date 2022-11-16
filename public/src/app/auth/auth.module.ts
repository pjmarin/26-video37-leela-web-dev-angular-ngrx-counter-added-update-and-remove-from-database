import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { StoreModule } from '@ngrx/store';
// import { AuthReducer } from './state/auth.reducer';
// import { AUTH_STATE_NAME } from './state/auth.selector';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // { path: '', redirectTo: 'login' }, // original code from the video, not working
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '**', redirectTo: 'login' }
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    // EffectsModule.forFeature([AuthEffects]),
    EffectsModule.forFeature(),
    // StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),  // para solucionar el problema de que no puede leer la propieda user del objeto state (public/src/app/auth/state/auth.selector.ts)
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {}