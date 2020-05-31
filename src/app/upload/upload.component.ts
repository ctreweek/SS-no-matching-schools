import { Component, OnInit, Input } from '@angular/core';
import { schools } from '../schools';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
noMatchingSchool;
total = 0;

convertFile(){
    const input = (<HTMLInputElement>document.getElementById('fileInput')).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      this.noMatchingSchool = this.csvToJSON(text);
    };
    reader.readAsText(input/*, "UTF-8"*/);
  };

  csvToJSON(csv) {
     let rows = csv.split("\n");
     let columnRows = [];

     for (let i = 0; i < rows.length; i++) {
       columnRows.push(rows[i].split(","));
     }

     let header = columnRows[0];
     header.unshift("Row");
     let noMatch = []

     for (let i = 1; i < columnRows.length; i++) {
       if(schools.includes(columnRows[i][0]) === false) {
         columnRows[i].unshift(columnRows.indexOf(columnRows[i]));
         noMatch.push(columnRows[i]);
       }
     }
     this.total = noMatch.length;

    let jsonArr = [];

    for (let i = 0; i < noMatch.length; i++) {
      let rowObj = {};
      for (let j = 0; j < noMatch[i].length; j++) {
        rowObj[header[j]] = noMatch[i][j];
      }
      jsonArr.push(rowObj);
    }
    return jsonArr;
  }

  constructor() { }

  ngOnInit() {

  }

}
