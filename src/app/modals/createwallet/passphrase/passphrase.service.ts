import { Injectable } from '@angular/core';
import { RPCService } from '../../../core/rpc/rpc.service';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PassphraseService {

  private log: any = Log.create('passphrase.service');

  private validWords: string[];

  constructor(private _rpc: RPCService) {
    this.validateWord('initWords');
  }

  /*
   * This is the logic for creating a new recovery phrase
  */
  generateMnemonic(success: Function, password?: string) {
    this.log.d(`password: ${password}`);
    const params = ['new', password];

    if (password === undefined || password === '') {
      params.pop();
    }
    this._rpc.call('mnemonic', params)
      .subscribe(
        response => success(response),
        error => Array(24).fill('error'));
  }

  validateWord(word: string): boolean {
    if (!this.validWords) {
      this._rpc.call('mnemonic', ['dumpwords'])
      .subscribe(
        (response: any) => this.validWords = response.words,
        // TODO: Handle error appropriately
        error => this.log.er('validateWord: mnemonic - dumpwords: Error dumping words', error));

      return false;
    }

    return this.validWords.indexOf(word) !== -1;
  }

  importMnemonic(words: string[], password: string) {
    const params = [words.join(' '), password];
    if (!password) {
      params.pop();
    }

    return this._rpc.call('extkeygenesisimport', params);
  }
}
