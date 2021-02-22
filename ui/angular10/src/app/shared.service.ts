import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://127.0.0.1:8000";
readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http:HttpClient) { }



  getPeerList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/peer/');
  }

  addPeer(val:any){
    return this.http.post(this.APIUrl + '/peer/',val);
  }

  updatePeer(val:any){
    return this.http.put(this.APIUrl + '/peer/',val);
  }

  deletePeer(val:any){
    return this.http.delete(this.APIUrl + '/peer/'+val);
  }


 
  getPeerDataList(val:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/peerData/' + val);
  }

  addPeerData(val:any){
    return this.http.post(this.APIUrl + '/peerData/',val);
  }

  updatePeerData(val:any){
    return this.http.put(this.APIUrl + '/peerData/',val);
  }

  deletePeerData(val:any){
    return this.http.delete(this.APIUrl + '/peerData/'+val);
  }




  getAllPeerNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/peer/');
  }


}
