import { Component, OnInit } from '@angular/core';
import {GROUPS} from '../../mock-db';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups = GROUPS;
  ngOnInit() {
  }

}
