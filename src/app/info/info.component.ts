import { Component, OnInit } from '@angular/core';

import { Info } from './info.model';
import { InfoService } from './info.service';

@Component({
  selector: "app-info",
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {

  info: Info[] = [];
  inputColor : String;
  currentColor: String;
  inputNumber : Number;
  currentNumber: Number;


  constructor(private infoService: InfoService) {

  }

  ngOnInit () {
    this.fetchInfo();
  }

  fetchInfo() {
    this.infoService.getInfo()
    .subscribe((data: Info[])=> {
      this.info = data;
      this.currentColor = this.info[0].color;
      this.currentNumber = this.info[0].number;
    })
  }

  onColorInput(event: Event) {
    this.inputColor = (<HTMLInputElement>event.target).value;
  }

  onNumberInput(event : Event) {
    this.inputNumber = parseInt((<HTMLInputElement>event.target).value);
  }

  onSaveInput() {
    if(this.inputColor && this.inputNumber) {
      this.infoService.updateInfo(this.currentColor, this.inputColor, this.inputNumber)
      .subscribe((data: Info) => {
        console.log('Response data: ', data);
        this.currentColor = data.color;
        this.currentNumber = data.number;
      })
    }
    else {
      alert('Both input fields must contain data!')
    }
  }


}
