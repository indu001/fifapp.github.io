import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupsComponent } from './components/groups/groups.component';
import { MatchesComponent } from './components/matches/matches.component';
import { GroupComponent } from './components/group/group.component';


@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    MatchesComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
