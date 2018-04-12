import { Injectable } from '@angular/core';
import {  } from '@firebase';
import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: true,
  };

  constructor() {
    if ( localStorage.getItem('cp_settings') != null ) {
      this.settings = JSON.parse(localStorage.getItem('cp_settings'));
    }
   }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
