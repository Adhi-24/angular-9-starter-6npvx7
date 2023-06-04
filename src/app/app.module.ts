import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DropdownSearchComponent } from './hello.component';
import { SearchDropdown } from './search-dropdown/search-dropdown';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, DropdownSearchComponent, SearchDropdown],
  bootstrap: [AppComponent],
})
export class AppModule {}
