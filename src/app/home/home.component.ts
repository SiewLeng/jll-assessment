import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { secret } from '../../../secret';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public query: string = '';
  public cats: any = [];
  public isLoading: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.isLoading = false;
    this.cats = [];
    this.query = '';
  }

  submit() {
    if (this.query) {
      this.isLoading = true;
      this.searchCats(this.query).then((data) => {
        console.log(data);
        this.cats = data;
        this.isLoading = false;
      });
    } else {
      this.cats = [];
    }
  }

  async searchCats(name: string) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=6&size=full&name=${name}`;
    let headers = new HttpHeaders();
    headers = headers.append('x-api-key', secret.catApiKey);
    return this.http.get(apiUrl, { headers }).toPromise();
  }

}
