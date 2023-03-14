import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  file: any;
  textValue: string;
  fullTextArea: boolean = false;
  disabledPar: boolean = false;
  parser: boolean = false;
  testValue: string;
  tableTh = [
    {
      title: '#',
      btn: false,
    },
    {
      title: 'Статус',
      btn: false,
    },
    {
      title: 'Facebook login',
      btn: true,
    },
    {
      title: 'Facebook password',
      btn: true,
    },
    {
      title: 'Facebook token',
      btn: true,
    },
    {
      title: 'Email login',
      btn: true,
    },
    {
      title: 'Email password',
      btn: true,
    },
    {
      title: 'Useragent',
      btn: true,
    },
    {
      title: 'Cookies',
      btn: false,
    },
    {
      title: 'Notes',
      btn: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  uploadFiles(e: any): void {
    let files = [...Array.from(e.target.files)];
    files.forEach((file: any) => {
      this.file = file;
      this.disabledPar = true;
      let reader = new FileReader();
      // reader.readAsDataURL(file);  если надо считать как url
      reader.readAsText(file);
      reader.onload = () => {
        this.testValue = reader.result as string;
      };
      // если надо отправить файл на бэк
      // const formData = new FormData();
      // formData.append('file', file);
    });
    // const blob = new Blob([this.textValue], { type: 'text/plain' });
    // const formData = new FormData();
    // formData.append('file', blob, 'file.txt');
  }
  onTextChange(): void {
    if (this.textValue.length > 1) {
      this.fullTextArea = true;
      this.disabledPar = true;
    } else {
      this.fullTextArea = false;
    }
  }

  parse(): void {
    this.parser = true;
    // если надо отправить файл на бэк
    // this.httpClient.post('/api/upload', formData)
    //   .subscribe(response => {
    //     console.log('Файл успешно загружен на сервер');
    //   }, error => {
    //     console.log('Ошибка при загрузке файла', error);
    //   });
  }

  cancel(): void {
    this.parser = false;
    this.disabledPar = false;
    this.fullTextArea = false;
    this.file = null;
  }

  downloadFile(): void {
    if (this.textValue.length > 1) {
      const blob = new Blob([this.textValue], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'file.txt';
      link.click();
      window.URL.revokeObjectURL(url);
    } else {
      const link = document.createElement('a');
      link.href = this.testValue;
      link.download = 'file';
      link.click();
    }
  }
}
