import { Component, OnInit } from '@angular/core';
import { LoremIpsum } from "lorem-ipsum";
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
  text: String;
  constructor() { }

  ngOnInit() {
    this.lorem.generateParagraphs(7);
    this.text = this.lorem.generateParagraphs(7);
  }

}
