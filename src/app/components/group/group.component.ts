import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input() group:object;
  constructor() { }
  teamName(name:string):string{
    let nam = name.replace(/\s/g,'').toLowerCase();
    return nam
  }
  ngOnInit() {
  }

}
