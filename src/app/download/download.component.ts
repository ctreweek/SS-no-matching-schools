import { Component, OnInit, Input} from '@angular/core';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  @Input() noMatchingSchool: string;
  objArr;

  constructor() {

  }

  ngOnInit(): void {
    this.objArr = this.noMatchingSchool;
  }

  convertToCSV(objArray) {
     let str = '';
     let csvHeader = '';

     Object.keys(objArray[0]).forEach((key, index) => {
       csvHeader += key + ','
     })

     csvHeader = csvHeader.substring(0, csvHeader.length - 1);
     str += csvHeader + '\n';

     for (let i = 0; i < objArray.length; i++) {
         let line = '';
         for (let index in objArray[i]) {
             if (line != '') line += ','

             line += objArray[i][index];
         }

         str += line + '\n';
     }
    console.log(str);
    return str;
 }

 exportCSV(rows, filename) {
   let csv = this.convertToCSV(rows);
   let exportName = filename + '.csv';

   var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportName);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
 }


}
