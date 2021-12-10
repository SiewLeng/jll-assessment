import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public query: string = 'Cat';

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  submit() {
    const { catApiKey } = environment;
    console.log({ catApiKey });
    this.searchCats(this.query).then((data) => {
      console.log(data);
    });
  }

  async searchCats(name: string) {
    const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=6&size=full&name=${name}`;
    let headers = new HttpHeaders();
    headers = headers.append('x-api-key', environment.catApiKey);
    return this.http.get(apiUrl, { headers }).toPromise();
  }

}
