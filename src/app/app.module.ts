import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BsDropdownModule, CollapseModule, ModalModule, PaginationModule } from 'ngx-bootstrap';

import { SharedModule } from './shared/shared.module';
import { SidebarModule } from './core/sidebar/sidebar.module';
import { WalletModule } from './wallet/wallet.module';

import { WindowService } from './core/window.service';

import { AppComponent } from './app.component';
import { StatusComponent } from './core/status/status.component';
import { OverviewComponent } from './overview/overview.component';

// TODO: Move to modal module
import { FullmodalComponent } from './core/fullmodal/fullmodal.component';
import { SyncingComponent } from './modals/syncing/syncing.component';
import { RecoverwalletComponent } from './modals/recoverwallet/recoverwallet.component';
import { GeneratewalletComponent } from './modals/generatewallet/generatewallet.component';
import { FirsttimeComponent } from './modals/firsttime/firsttime.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent, data: { title: 'Overview' } },
  { path: '**', redirectTo: 'overview', pathMatch: 'full' } // Catch all route
];

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    StatusComponent,
    FullmodalComponent,
    SyncingComponent,
    RecoverwalletComponent,
    GeneratewalletComponent,
    FirsttimeComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    SharedModule,
    SidebarModule.forRoot(),
    WalletModule.forRoot()
  ],
  providers: [
    WindowService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
