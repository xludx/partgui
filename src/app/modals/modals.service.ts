import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Log } from 'ng2-logger';

import { BlockStatusService } from '../core/rpc/rpc.module';
import { RPCService } from '../core/rpc/rpc.module';

import { CreateWalletComponent } from './createwallet/createwallet.component';
import { ColdstakeComponent } from './coldstake/coldstake.component';
import { DaemonComponent } from './daemon/daemon.component';
import { SyncingComponent } from './syncing/syncing.component';
import { UnlockwalletComponent } from './unlockwallet/unlockwallet.component';
import { EncryptwalletComponent } from './encryptwallet/encryptwallet.component';
import { MdDialog } from '@angular/material';
import { ModalsComponent } from './modals.component';

@Injectable()
export class ModalsService {

  public modal: any = null;
  private message: Subject<any> = new Subject<any>();
  private progress: Subject<Number> = new Subject<Number>();

  public enableClose: boolean = true;
  private isOpen: boolean = false;
  private manuallyClosed: any[] = [];

  // Is true if user already has a wallet (imported seed or created wallet)
  public initializedWallet: boolean = false;

  private data: string;

  private log: any = Log.create('modals.service');

  messages: Object = {
    createWallet: CreateWalletComponent,
    coldStake: ColdstakeComponent,
    daemon: DaemonComponent,
    syncing: SyncingComponent,
    unlock: UnlockwalletComponent,
    encrypt: EncryptwalletComponent
  };

  constructor (
    private _blockStatusService: BlockStatusService,
    private _rpc: RPCService,
    private dialog: MdDialog
  ) {
    // open syncing modal
    this._blockStatusService.statusUpdates.asObservable().subscribe(status => {
      this.progress.next(status.syncPercentage);
      this.openSyncModal(status);
    });

    this.openInitialCreateWallet();

    // open daemon model on error
    this._rpc.modalUpdates.asObservable().subscribe(status => {
      if (status.error) {
        this.enableClose = true;
        this.open('daemon', status);
        // no error and daemon model open -> close it
      } else if (this.wasAlreadyOpen('daemon')) {
        this.close();
      }
    });
  }

  /**
    * Open a modal
    * @param {string} modal   The name of the modal to open
    * @param {any} data       Optional - data to pass through to the modal.
    */
  open(modal: string, data?: any): void {
    const dialogRef = this.dialog.open(ModalsComponent, {disableClose: true, width: '100%', height: '100%'});
    if (modal in this.messages) {
      if (
        (data && data.forceOpen)
        || !this.wasManuallyClosed(this.messages[modal].name)
      ) {
        if (!this.wasAlreadyOpen(modal)) {
          this.log.d(`next modal: ${modal}`);
          this.modal = this.messages[modal];
          dialogRef.componentInstance.open(this.modal, {data: data});
          // this.message.next({modal: this.modal, data: data});
          this.isOpen = true;
          dialogRef.componentInstance.enableClose = true;
          dialogRef.afterClosed().subscribe(() => {
            this.close();
          });
        }
      }
    } else {
      this.log.er(`modal ${modal} doesn't exist`);
    }
  }

  /** Close the modal */
  close() {
    const isOpen = this.isOpen;

    if (!!this.modal && !this.wasManuallyClosed(this.modal.name)) {
      this.manuallyClosed.push(this.modal.name);
    }
    this.isOpen = false;
    this.modal = undefined;

    if (isOpen) {
      this.message.next({close: true});
    }
  }

  /**
    * Check if a modal was manually closed
    * @param {any} modal  The modal to check
    */
  wasManuallyClosed(modal: any) {
    return this.manuallyClosed.includes(modal);
  }

  getMessage() {
    return (this.message.asObservable());
  }

  wasAlreadyOpen(modalName: string) {
    return (this.modal === this.messages[modalName]);
  }

  storeData(data: any) {
    this.data = data;
  }

  getData() {
    const data: any = this.data;
    this.data = undefined;
    return (data);
   }

  /** Get progress set by block status */
  getProgress() {
    return (this.progress.asObservable());
  }

  /**
    * Open the Sync modal if it needs to be opened
    * @param {any} status  Blockchain status
    */
  openSyncModal(status: any) {
    // Open syncing Modal
    if (!this.isOpen && !this.wasManuallyClosed(this.messages['syncing'].name)
      && (status.networkBH <= 0
      || status.internalBH <= 0
      || status.networkBH - status.internalBH > 50)) {
        this.open('syncing');
    }
  }

  /** Initial wallet creation */
  openInitialCreateWallet() {
    this._rpc.state.observe('walletInitialized')
      .subscribe(
        state => {
          this.initializedWallet = state;
          if (state) {
            this.log.i('Wallet already initialized.');
            return;
          }
          this.open('createWallet', {forceOpen: true});
        });
  }

}
