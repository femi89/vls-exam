import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private httpClient: HttpClient,
  ) { }
  getStorageItem(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(unescape(atob(data)));
    } else {
      return null;
    }
  }
  addStorageItem(key: string, value: any): void {
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    localStorage.setItem(key, encryptedValue);
  }
  removeStorageItem(key: string): void {
    localStorage.removeItem(key);
  }
  removeAllItems(): void {
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        this.removeStorageItem(key);
      }
    }
  }
}
