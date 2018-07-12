import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
import {SeniorProjectModule} from "../senior_project/senior-project.module";
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', loadChildren: '../landing/landing.module#LandingModule' },
      { path: 'about', loadChildren: '../about/about.module#AboutModule' },
      { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
      { path: 'senior-project', loadChildren: '../senior_project/senior-project.module#SeniorProjectModule' },
    { path: 'form', loadChildren: '../form/form.module#FormModule' },
    { path: 'statistics', loadChildren: '../statistics/statistics.module#StatisticsModule' },
    { path: 'ui', loadChildren: '../ui/ui.module#UiModule' },
    { path: 'components', loadChildren: '../components/components.module#ComponentsModule' },
    { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' },
    { path: 'widgets', loadChildren: '../widgets/widgets.module#WidgetsModule' },
    { path: 'special', loadChildren: '../special/special.module#SpecialModule' },
    { path: 'package', loadChildren: '../package/package.module#PackageModule' },
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
