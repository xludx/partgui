import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { BsDropdownModule, CollapseModule, ModalModule, PaginationModule } from 'ngx-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import { SidebarModule } from './core/sidebar/sidebar.module';
import { AccordionModule } from './core/accordion/accordion.module';

import { AppComponent } from './app.component';

import { WindowService } from './core/window.service';

import { HeaderComponent } from './core/header/header.component';
import { StatusComponent } from './core/status/status.component';
import { OverviewComponent } from './overview/overview.component';
import { AddressesComponent } from './wallet/addresses/addresses.component';
import { SendComponent } from './wallet/transactions/send.component';
import { TransactionsTableComponent } from './wallet/transactions/transaction-table/transaction.table.component';
import { BalanceComponent } from './wallet/balances/balance.component';
import { AddressTableComponent } from './wallet/addresses/address-table/address.table.component';
import { FullmodalComponent } from './core/fullmodal/fullmodal.component';
import { SyncingComponent } from './modals/syncing/syncing.component';
import { RecoverwalletComponent } from './modals/recoverwallet/recoverwallet.component';
import { GeneratewalletComponent } from './modals/generatewallet/generatewallet.component';
import { FirsttimeComponent } from './modals/firsttime/firsttime.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent, data: { title: 'Overview' } },
  { path: 'send', component: SendComponent, data: { title: 'Send' } },
  { path: '**', redirectTo: 'overview', pathMatch: 'full' } // Catch all route
];

@NgModule({
  declarations: [
    AppComponent,
    TransactionsTableComponent,
    SendComponent,
    AddressesComponent,
    OverviewComponent,
    HeaderComponent,
    StatusComponent,
    BalanceComponent,
    AddressTableComponent,
    FullmodalComponent,
    SyncingComponent,
    RecoverwalletComponent,
    GeneratewalletComponent,
    FirsttimeComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    ClipboardModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    SidebarModule.forRoot(),
    AccordionModule
  ],
  providers: [
    WindowService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
