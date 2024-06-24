import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {path: "home", component: DashboardComponent },
    {path: "login", component: LoginComponent },
    //{path: "", pathMatch: "full", redirectTo: "/login" },
    {path: "**", component: DashboardComponent },
];
