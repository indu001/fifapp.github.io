import { Component, OnInit } from '@angular/core';
import data from '../../db';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups = data.Groups;
  ngOnInit() {
  }

}
