import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContainerComponent } from './main-container/main-container.component';
import { LoginContainerComponent } from './login-container/login-container.component';

const routes: Routes = [
  { path: "", component: MainContainerComponent },
  { path: "login", component: LoginContainerComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
