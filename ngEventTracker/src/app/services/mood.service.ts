import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Mood } from "../models/mood";

@Injectable({
  providedIn: "root"
})
export class MoodService {
  private baseUrl = "http://localhost:8085/";
  private url = this.baseUrl + "api/moods";

  constructor(private http: HttpClient) {}

  index(): Observable<Mood[]> {
    return this.http.get<Mood[]>(this.url);
  }

  show(id: string): Observable<Mood> {
    return this.http.get<Mood>(this.url + "/" + id);
  }

  create(newMood: Mood) {
    const myHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    };
    return this.http.post<Mood>(this.url, newMood, { headers: myHeaders });
  }

  update(updateMood: Mood) {
    const upUrl = this.url + "/" + updateMood.id;
    const myHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    };

    return this.http.put<Mood>(this.url + "/" + updateMood.id, updateMood, {
      headers: myHeaders
    });
  }

  destroy(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
}
