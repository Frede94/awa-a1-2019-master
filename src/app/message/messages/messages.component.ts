import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {MessageService} from '../shared/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: any[];
  messagesPaged: Observable<any[]>;
  latest: any;
  message = '';
  humanReadableMessage = '';
  time: number;
  constructor(private messageService: MessageService) {
    this.messageService.getMessagesLastByLimit(8).subscribe(messages => {
      this.messages = messages;
      this.latest = messages[0];
    });
  }

  ngOnInit() {
  }

  convertMessage(message: string): string {
    return this.messageService.convertToText(message);
  }

  send() {
    const time = new Date();
    this.messageService.addMessage(time, this.message.trim() ).then(done => {
      console.log('saved');
    }, err => {
      console.log(err);
    });
    this.clear();
  }

  morseDot(active) {
    if (active) {
      this.time = (new Date()).getTime();
    } else {
      // const clickTime = (new Date()).getTime() - this.time;
        this.message += '.';
      this.time = -1;
    }
  }

  morseDash(active) {
    if (active) {
      this.time = (new Date()).getTime();
    } else {
      // const clickTime = (new Date()).getTime() - this.time;
        this.message += '-';
      this.time = -1;
    }
  }

  keyMorseDot(active) {
    if (active) {
      this.time = (new Date()).getTime();
    } else {
      // const clickTime = (new Date()).getTime() - this.time;
      this.message += '.';
      this.time = -1;
    }
  }

  keyMorseDash(active) {
    if (active) {
      this.time = (new Date()).getTime();
    } else {
      // const clickTime = (new Date()).getTime() - this.time;
      this.message += '-';
      this.time = -1;
    }
  }

  space() {
    this.message += '/';
    this.humanReadableMessage = this.messageService.convertToText(this.message);
  }

  next() {
    this.message += ' ';
    this.humanReadableMessage = this.messageService.convertToText(this.message);
  }

  clear() {
    this.message = '';
    this.humanReadableMessage = '';
  }


}
