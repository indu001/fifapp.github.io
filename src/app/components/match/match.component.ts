import { Component, OnInit, Input } from '@angular/core';
import {Match} from '../../match';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() match:Match;
  @Input() index:any;
  constructor() { }
  teamName(name:string):string{
    let nam = name.replace(/\s/g,'').toLowerCase();
    return nam
  }
  ngOnInit() {
  }

}
