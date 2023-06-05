import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchDropdown } from './search-dropdown/search-dropdown.component';
@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, SearchDropdown],
  exports: [SearchDropdown],
  bootstrap: [AppComponent],
})
export class AppModule {}
