import { Injectable } from '@angular/core';
import {Group} from './group';
import {Match} from './match';
import {Schedule} from './schedule';
import {GROUPS, INFO} from './mock-db';
import { tick } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  
  getMatches():Match[]{
    const matches =[];
    const groups = GROUPS;
    const info = INFO;
    const grp_matches = (info.grp_size * (info.grp_size-1))/2;
    let grand_total = groups.length * grp_matches;
    let pairs = [];
   
    const grps = groups.map((elem, i , a) => {
        const item = new Group();
        [item.id, item.teams,item.done] = [elem.id ,elem.teams, false];
        [item.total,item.current, item.maxpairs] = [grp_matches,0, info.grp_size/2]
        if(i < (a.length-1)){
           item.next = i+1;
        } else{
          item.next = 0;
        }
        return item;
    });
    const pairTeams = (teams, id) => {
      const len = teams.length;
      let t1 = 0, t2= len-1;
     

      for(let idx =0 ; idx < (len/2); idx++){
        let obj = {
          pair:[teams[t1], teams[t2]],
          id:id
        };
          pairs.push(obj);
          t1++;
          t2--;
      }
         
    }
    const roundRobin = (teams):string[] => {
       const result = [];
       const len = teams.length;
       result[0] = teams[0];
       for(let i = 1; i<=len-1 ; i++ ){
         const index = (i+1) % len;
         if( index !== 0 ){
          result[index] = teams[i];
         } else{
           result[1] = teams[i];
         }
         
       }
       return result;
    }

    let curgrp = grps[0];
   
    
    while( pairs.length < grand_total){
      let teams = curgrp.teams;
      pairTeams(teams, curgrp.id);
      curgrp.teams = roundRobin(teams);
      curgrp = grps[curgrp.next];
    }

    const schedule = new Schedule(info.slots, info.start_dt);
    
    while(pairs.length > 0){
       let {pair,id} = pairs[0];
       pairs.splice(0,1);
       const timeslot = schedule.nextSchedule();
       const match = new Match();
       [match.slot, match.day, match.teams] = [timeslot.slot, timeslot.day, pair]
        match.grp = id;

        matches.push(match);

    }

    
    return matches;

  }
}
