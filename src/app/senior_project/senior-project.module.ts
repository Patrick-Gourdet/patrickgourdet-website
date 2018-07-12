import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeniorProjectComponent } from './senior-project.component';

export const routes = [
  { path: '', component: SeniorProjectComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    SeniorProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})

export class SeniorProjectModule {
  static routes = routes;
}
