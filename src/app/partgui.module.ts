import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { NgxElectronModule } from 'ngx-electron';
import { BsDropdownModule, CollapseModule, ModalModule, ModalDirective, PaginationModule, TooltipModule } from 'ngx-bootstrap';

import { SharedModule } from './shared/shared.module';
import { SidebarModule } from './core/sidebar/sidebar.module';
import { WalletModule } from './wallet/wallet.module';
import { RpcModule } from './core/rpc/rpc.module';
import { ModalsModule } from './modals/modals.module';

import { StateService } from './core/state/state.service';
import { WindowService } from './core/window.service';

import { PartGuiComponent } from './partgui.component';

import { StatusComponent } from './core/status/status.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';

import { ExampleModule } from 'partgui-core-components-library'; // testing the import from core-components-library

const routes: Routes = [
  { path: 'overview', component: OverviewComponent, data: { title: 'Overview' } },
  { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
  { path: '**', redirectTo: 'overview', pathMatch: 'full' } // Catch all route
];

@NgModule({
  declarations: [
    PartGuiComponent,
    StatusComponent,
    OverviewComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NgxElectronModule,
    SharedModule,
    SidebarModule.forRoot(),
    WalletModule.forRoot(),
    RpcModule.forRoot(),
    ModalsModule,
    ExampleModule // testing the import from core-components-library
  ],
  providers: [
    WindowService
  ],
  bootstrap: [ PartGuiComponent ]
})

export class PartGuiModule {
  constructor() {
  }
}
