import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {  provideRouter } from '@angular/router';
import { GrpcCoreModule } from '@ngx-grpc/core';
import { GrpcWebClientModule } from '@ngx-grpc/grpc-web-client';
import { Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SessionsComponent } from './sessions.components';
import { ResultsComponent } from './results.component';
import { SessionDetailComponent } from './session-detail.component';
import { TasksListComponent } from './tasks-list.component';

const routeConfig: Routes = [
  {
     path: 'tasks',
     component: TasksListComponent
  },
  {
     path: 'sessions', 
     component: SessionsComponent
  },
  {
    path:'sessions/:id', 
    component: SessionDetailComponent
   
  },
  {
    path: 'results',
    component: ResultsComponent
  }
];


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(GrpcCoreModule.forRoot()),
    importProvidersFrom(GrpcWebClientModule.forRoot({ settings: { host: '' } })),
    provideRouter(routeConfig),
    provideAnimations()
]
};
