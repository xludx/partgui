import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Log } from 'ng2-logger';

import { WindowService } from './core/window.service';

import { SettingsService } from './settings/settings.service';

// Modal example
import { ModalsService } from './modals/modals.service';

// Syncing example
import { BlockStatusService } from './core/rpc/blockstatus.service';

@Component({
  selector: 'partgui-root',
  templateUrl: './partgui.component.html',
  styleUrls: ['./partgui.component.scss', './partgui.component.controls.scss'],
  providers: [
    SettingsService
  ]
})
export class PartGuiComponent implements OnInit {
  isCollapsed: boolean = true;
  isFixed: boolean = false;
  title: string = '';
  log: any = Log.create('partgui.component');

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _statusService: BlockStatusService,
    public window: WindowService,
    // Modal example
    private _modalsService: ModalsService
  ) {
  }

  ngOnInit() {
    // Change the header title derived from route data
    // Source: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
    this._router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this._route)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .flatMap(route => route.data)
      .subscribe(data => this.title = data['title']);

    this.log.er('error!');
    this.log.w('warn!');
    this.log.i('info');
    this.log.d('debug');
  }


  createWallet() {
    this._modalsService.open('createWallet', {forceOpen: true});
  }
}
