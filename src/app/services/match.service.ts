import { Injectable } from '@angular/core';
import {Group} from '../models/group';
import {Match} from '../models/match';
import {Schedule} from '../models/schedule';
import {GROUPS, INFO} from '../mock-db';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  getMatches(): Match[] {
    const matches = [];
    const groups = GROUPS;
    const info = INFO;
    const pairs = [];
    const grps = groups.map((elem, i , a) => {
        const item = new Group();
        [item.id, item.teams, item.total, item.done] = [elem.id , elem.teams, 0, false];
        if (i < (a.length - 1)) {
           item.next = i + 1;
        } else {
          item.next = 0;
        }
        return item;
    });
    const grand_total = groups.reduce((tot, grp) => {
      let n = grp.teams.length;
      if (n % 2 !== 0) {
         n += 1;
      }
      tot += (n * (n - 1 ) / 2);
      return tot ;
    }, 0);

    const pairTeams = (arr, id) => {
      const teams = arr;
      const len = teams.length;
      let t1 = 0, t2 = len - 1;

      for ( let idx = 0 ; idx < (len / 2); idx++) {
        /* if opponent is dummy , ignore pair */
        // if (teams[t1] !== null && teams[t2] !== null) {
          const obj = {
            pair: [ teams[t1], teams[t2]],
            id: id
          };
            pairs.push(obj);
        // }
        t1++;
        t2--;
      }
    };
    const roundRobin = (teams): string[] => {
       const result = [];
       const len = teams.length;
       result[0] = teams[0];
       for ( let i = 1; i <= len - 1 ; i++ ) {
         const index = (i + 1) % len;
         if ( index !== 0 ) {
          result[index] = teams[i];
         } else {
           result[1] = teams[i];
         }
       }
       return result;
    };

    let curgrp = grps[0];

    /*Compute team pairings for all groups */
    while ( pairs.length < grand_total) {
      /* Add dummy team if number of teams is odd */
    if (curgrp.teams.length % 2 !== 0) {
      curgrp.teams.push(null);
    }
    const len = curgrp.teams.length;
    const total = len * (len - 1) / 2;
    const paircount = Math.floor(len / 2);
    if (!curgrp.done) {
      const teams = curgrp.teams;
      pairTeams(teams, curgrp.id);
      curgrp.teams = roundRobin(teams);
      curgrp.total += paircount;
    }
     if (curgrp.total === total) {
       curgrp.done = true;
     }
     curgrp = grps[curgrp.next];
    }

    /* Alott time and day for each pair */
    const schedule = new Schedule(info.slots, info.start_dt);
    while (pairs.length > 0) {
       const {pair, id} = pairs[0];
       pairs.splice(0, 1);
       const timeslot = schedule.nextSchedule();
       if ( pair[0] !== null && pair[1] !== null) {

       const match = new Match();
       [match.slot, match.day, match.teams] = [timeslot.slot, timeslot.day, pair];
        match.grp = id;
        matches.push(match);

       }

    }

    return matches;

  }
}
