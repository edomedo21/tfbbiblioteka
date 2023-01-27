import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mg-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss']
})
export class PocetnaComponent implements OnInit {

  query = '';
  results: any = [];
  private SERVER_URL = environment.serverURL;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  search(){
    this.http.get(`${this.SERVER_URL}auth/search`, { params: { q: this.query}}).subscribe(results => {
      this.results = results;
      console.log(this.results);
    });
    
  }

}
