import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { }

  getQuery(query: string) {
    const URL = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({

      /* IMPORTANTE:
        para generar un token automatico de spotify
        es necesario un back-end, ya que spotify tiene una restricion
        de que solo los servidores pueden hacer peticiones post, de lo contrario
        tendremos que generar el token manualmente desde una app como postman o desde
        el propio spotify.
      */
     // tslint:disable-next-line: max-line-length
      'Authorization': 'Bearer BQAdCDFiZoOQeDOfk5Ya9E0CmaNQm9xH9fKOKY2qA_lupwxgzWi-LgiIcQ9HtCTYPJjl6Kd_g6oYpqYJbZmPaLH0Kvxw7WVQM9k52xhlCvfB3C8Nz-b74RqHUPvHVCd0XEQgkEzPSjLX-nh3TRg8lbatYBn9DKc'
    });

    return this.http.get(URL, { headers });
  }

  getNewReleases(): any {
    return this.getQuery('browse/new-releases')
               .pipe( map( data => data['albums'].items));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&offset=15`)
               .pipe( map( data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
               .pipe(map( data => data['tracks']));
  }

}
