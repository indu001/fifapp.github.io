import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupsComponent } from './components/groups/groups.component';
import { MatchesComponent } from './components/matches/matches.component';
import { GroupComponent } from './shared/group/group.component';
import { MatchComponent } from './shared/match/match.component';


@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    MatchesComponent,
    GroupComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
