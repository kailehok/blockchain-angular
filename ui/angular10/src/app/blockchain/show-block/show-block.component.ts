import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import {md5} from 'md5';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ElementFinder } from 'protractor';
declare var foo: Function;
declare var stringToHash: Function;

@Component({
  selector: 'app-show-block',
  templateUrl: './show-block.component.html',
  styleUrls: ['./show-block.component.css']
})
export class ShowBlockComponent implements OnInit {

  constructor(private service:SharedService) {
 
   }

  PeerDataList:any=[];
  AdminList:any=[];
  
  PeerList:any=[];
  PeerId: any=[];
  Name: string;
  Data: string = "";
  Peer: string;
  Color: string = "blue"
  duplicate: boolean = false;
  Admin = "admin";

  ModalTitle:string;

  show:boolean= true;
  leng: number;
  start: number;
  justClicked = false;
doubleClicked = false;

/*
Doubling click on the peer will activate the delete Peer pop up.
Single click on the peer will change the node status to that peer.
*/
clickPeer(name,index) {
  if (this.justClicked === true) {
    this.doubleClicked = true;
    this.deletePeer(name);
  } else {
    this.justClicked = true;
    setTimeout(() => {
      this.justClicked = false;
      if (this.doubleClicked === false) {
        this.changePeer(name,index);
      }
      this.doubleClicked = false;
    }, 500);
  }
}


/*
Function called during initialization of the compoennet
Refreshes peer list data
Refreshes data for the current peer

*/
  ngOnInit(): void {
    this.refreshPeerList();
    this.refreshPeerDataList();
    // console.log(this.Data);
   
   
    
  }


/*
Function called during adding of a new block


*/
  addClick(){
    // console.log(this.Data);
    var leng = this.PeerDataList.length;
    let peerData = new PeerData();
    peerData.PeerDataId = this.Name + (leng+1).toString() + this.Name ;
    peerData.Id = (leng+1); 
    peerData.Peer = this.Name; 
    peerData.Data = this.Data; 
    var TxHash = this.hashCode(this.PeerDataList[leng-1]["TxHash"],this.Data)
   
    peerData.TxHash = TxHash;

    peerData.UpdatedTxHash= TxHash; 
    peerData.Deleted = false;
    peerData.Date = this.getDate();
    // console.log(peerData);
    this.PeerDataList.push(peerData);

   
  
this.service.addPeerData(peerData).subscribe(res=>{
  alert(res.toString());
});
this.Data = '';



}


/*
Function called during the input of the data in the text box


*/

  addsInput(index){
    this.leng = this.PeerDataList.length;
    


    for (var i = index; i < this.leng; i++) {
      if (i==0){
        this.PeerDataList[i]["UpdatedTxHash"] = this.hashCode("GENESIS BLOCK", this.PeerDataList[i]["Data"]);
      }
      else{

      this.PeerDataList[i]["UpdatedTxHash"] = this.hashCode(this.PeerDataList[i-1]["UpatedTxHash"], this.PeerDataList[i]["Data"]);
      }
    }
 
  }

/*
Function called during the button click to repair the block.
*/


  editClick(index){

    if(this.PeerDataList[index]["UpdatedTxHash"] !== this.PeerDataList[index]["TxHash"])
    {  if (index==0){
      var TxHash = this.hashCode("GENESIS BLOCK UPDATED", this.PeerDataList[index]["Data"]);
          }
        else{


       
        var TxHash = this.hashCode(this.PeerDataList[index-1]["UpdatedTxHash"],this.PeerDataList[index]["Data"]);
        }
        this.PeerDataList[index]["TxHash"] = TxHash;
        this.PeerDataList[index]["UpdatedTxHash"] = TxHash;
        this.leng = this.PeerDataList.length;
       
    


    for (var i = index+1; i < this.leng; i++) {
      this.PeerDataList[i]["UpdatedTxHash"] = this.hashCode(this.PeerDataList[i-1]["UpatedTxHash"], this.PeerDataList[i]["Data"]);
      
    }
    }
  
  }



/*
Refreshed the list of peer by taking data from django backend

*/
  refreshPeerList(){
    
 
    this.service.getPeerDataList(this.Name).subscribe(data=>{
      this.PeerDataList=data;

    });
  
  }

/*
Refreshes the data of admin by taking data from django backend.
Admin stores the latest state of the blockchain.

*/
  refreshAdminList(){

    this.AdminList = []
 
    this.service.getPeerDataList(this.Admin).subscribe(data=>{
      this.AdminList=data;
     
    });
  
  }

/*
Refreshes the data of current activated Peer.


*/

  refreshPeerDataList(){
    this.PeerList = []
 
    this.service.getPeerList().subscribe(data=>{
      this.PeerList=data;
 
    });
   
  
  }

/*
Function to create a transaction hash.

*/

  hashCode(previousTxHash:any, data:any) {
    /*jshint bitwise:false */
    var i, l,
        hval = (data === undefined) ? 0x811c9dc5 : data;

        var random =  Math.floor(Math.random() * (9999 - 1000) + 1000); //The maximum is exclusive and the minimum is inclusive
        var random1 =  Math.floor(Math.random() * (9999 - 1000) + 1000); 
    var str = previousTxHash+data;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
 
        // Convert to 8 digit hex string
        return "000000x"+("0000000" + (hval >>> 0).toString(16)).substr(-8)+(hval >>> 0).toString(16)+random + this.generateString(80);
    
   
}


 generateString(length) {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

/*
Function to delete the Peer

*/

deletePeer(name){

  if(confirm('Are you sure you want to delete Peer ' +name+'?')){
    this.service.deletePeer(name).subscribe(data=>{
      alert(data.toString());
      this.refreshPeerDataList();
      this.refreshPeerList();
    })
  }

  
}

/*
Function to add a new Peer

*/
  addPeer(){
    var val = {PeerName: this.Peer,
                Color: "blue"};
  
    let peerData = new PeerData();
    peerData.PeerDataId = this.Peer + "1" + this.Peer ;
    peerData.Id = 1; 
    peerData.Peer = this.Peer; 
    peerData.Data = "Welcome to Blockchain"; 
    peerData.TxHash = this.hashCode("GENESIS BLOCK", peerData.Data);
    peerData.UpdatedTxHash= peerData.TxHash; 
    peerData.Deleted = false;
    peerData.Date = "2021-03-08 19:57:00"
    var leng = this.PeerList.length;
  
   for (var i = 0; i < leng; i++) {
     if ( this.PeerList[i]["PeerName"]==this.Peer){
       alert("Peer already exists!")
      return
     }
    }
  

      this.service.addPeer(val).subscribe(res=>{
        
      });
      this.refreshPeerDataList();
    this.service.addPeerData(peerData).subscribe(res=>{
    
    });
    
   
  
  
 
  }

  checkStatus(){
    var leng = this.PeerDataList.length;
    for (var i = 0; i < leng; i++){
      if(this.PeerDataList[i]["TxHash"] != this.PeerDataList[i]["UpdatedTxHash"]){
        return "RED";
      }
    }
    return "GREEN"

  }

  getDate(){
    var date = new Date();
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + " " + ('0' + (date.getHours() + 1)).slice(-2)+":" + ('0' + (date.getMinutes() + 1)).slice(-2)+":"+('0' + (date.getSeconds() + 1)).slice(-2)

  }

/*
Function to sort the values retrieve from django backend according to block ID

*/

  sortList(){
    for(let i=0; i< (this.PeerDataList.length);i++){

      if(i+1 == this.PeerDataList[i]['Id']){
        continue;
      }
      else{
        var index = this.PeerDataList[i]['Id'];
        var value = this.PeerDataList[i];
        this.PeerDataList[i] = this.PeerDataList[index-1]
        this.PeerDataList[index-1] = value
      }
     

    }
    console.log(this.PeerDataList,"finalP")

    for(let i=0; i< (this.AdminList.length);i++){

      if(i+1 == this.AdminList[i]['Id']){
        continue;
      }
      else{
        var index = this.AdminList[i]['Id'];
        var value = this.AdminList[i];
        this.AdminList[i] = this.AdminList[index-1]
        this.AdminList[index-1] = value
      }
     

    }
    console.log(this.AdminList,"finalA")
 
  }


/*
Function called to copy the values of unchanged blockchain to the bad Peer.

*/
  reMine(){
    let peerData = new PeerData();
    var leng = this.PeerDataList.length;
    var aleng = this.AdminList.length;
    this.sortList();
    for (var i = 0; i < leng; i++) {

                if (i>= aleng){
                  var id = this.PeerDataList[i]["Peer"]+ (i+1).toString() +this.PeerDataList[i]["Peer"]
                  this.service.deletePeerData(id).subscribe(res=>{
                  
                  });
                  continue;

                }
                peerData.PeerDataId = this.PeerDataList[i]["Peer"]+ (i+1).toString() +this.PeerDataList[i]["Peer"] ;
                peerData.Id = i+1;
                peerData.Peer = this.PeerDataList[i]["Peer"]; 
                peerData.Data = this.AdminList[i]["Data"]; 
                peerData.TxHash = this.AdminList[i]["TxHash"]; 
                peerData.UpdatedTxHash= this.AdminList[i]["UpdatedTxHash"]; 
                peerData.Deleted = false;
                peerData.Date= this.AdminList[i]["Date"]; 
                // console.log("hello",peerData)
                this.service.updatePeerData(peerData).subscribe(res=>{
                  
                });
                }
    
                for ( i = leng; i < aleng; i++) {
                  peerData.PeerDataId = this.PeerDataList[0]["Peer"] + (i+1).toString() + this.PeerDataList[0]["Peer"] ;
                  peerData.Id = i+1;
                  peerData.Peer = this.PeerDataList[0]["Peer"]; 
                  peerData.Data = this.AdminList[i]["Data"]; 
                  peerData.TxHash = this.AdminList[i]["TxHash"]; 
                  peerData.UpdatedTxHash= this.AdminList[i]["UpdatedTxHash"]; 
                  peerData.Deleted = false;
                  peerData.Date= this.AdminList[i]["Date"]; 
                  // console.log("hello",peerData)
                  this.service.addPeerData(peerData).subscribe(res=>{
                    
                  });
                  }

                  this.refreshPeerList();

  }

  /*
Function called when another Peer is activated.
Extracting data for the Peer to show its blockchain status.

*/

  changePeer(name,index) {

   
  

    let peerData = new PeerData();
    

    var leng = this.PeerDataList.length;
    var aleng = this.AdminList.length;
    console.log(this.PeerDataList,"peer")
    console.log(this.AdminList,"admin")
  
    // console.log("hello",peerData)
    // console.log(aleng,leng)
    var color = this.checkStatus()



    for (var i = 0; i < leng; i++) {
      peerData.PeerDataId = this.PeerDataList[i]["Peer"]+ (i+1).toString() + this.PeerDataList[i]["Peer"] ;
      peerData.Id = i+1;
      peerData.Peer = this.PeerDataList[i]["Peer"]; 
      peerData.Data = this.PeerDataList[i]["Data"]; 
      peerData.TxHash = this.PeerDataList[i]["TxHash"]; 
      peerData.UpdatedTxHash= this.PeerDataList[i]["UpdatedTxHash"]; 
      peerData.Deleted = false;
      peerData.Date= this.PeerDataList[i]["Date"]; 
      // console.log("hello",peerData)
      this.service.updatePeerData(peerData).subscribe(res=>{
        
      });
      }

      this.sortList();
      var admin = true;
      if(leng>aleng){
        for (var i = 0; i < aleng; i++){
        if (this.PeerDataList[i]["TxHash"] != this.AdminList[i]["TxHash"]){
          admin = false;
          break;


        }
      } 
    
  if (color == "GREEN" &&  admin ){
          for (var i = 0; i < aleng; i++) {
            peerData.PeerDataId = this.Admin+ (i+1).toString() + this.Admin ;
            peerData.Id = i+1;
            peerData.Peer = this.Admin; 
            peerData.Data = this.PeerDataList[i]["Data"]; 
            peerData.TxHash = this.PeerDataList[i]["TxHash"]; 
            peerData.UpdatedTxHash= this.PeerDataList[i]["UpdatedTxHash"]; 
            peerData.Deleted = false;
            peerData.Date= this.PeerDataList[i]["Date"]; 
            // console.log("hello",peerData)
            this.service.updatePeerData(peerData).subscribe(res=>{
              
            });
            }
            // console.log("extra",peerData)
            

            for ( i = aleng ; i < leng; i++) {
              peerData.PeerDataId = this.Admin+ (i+1).toString() + this.Admin ;
              peerData.Id = i+1;
              peerData.Peer = this.Admin; 
              peerData.Data = this.PeerDataList[i]["Data"]; 
              peerData.TxHash = this.PeerDataList[i]["TxHash"]; 
              peerData.UpdatedTxHash= this.PeerDataList[i]["UpdatedTxHash"]; 
              peerData.Deleted = false;
              peerData.Date= this.PeerDataList[i]["Date"]; 
              // console.log("extra",peerData)
            
              this.service.addPeerData(peerData).subscribe(res=>{
                
              });
              }
        }
      }

    

    

    



   this.Name = name;
 
   this.refreshPeerList();

   var leng = this.PeerList.length;

   for (var i = 0; i < leng; i++) {
     if (i == index){
      this.PeerList[i]["Color"]="red";
     }
     if (i != index){
      this.PeerList[i]["Color"]="blue";

     }
     this.refreshAdminList();

     
   
   
  };
 =
}
}


  
  

/*
Class to insert PeerData

*/

export class PeerData
{
  PeerDataId: string;
  Id: number;
  Peer: string;
  Data: string;
  TxHash: string;
  UpdatedTxHash: string;
  Deleted: boolean;
  Date: string

}

/*
Class to insert Peer

*/

export class Peer
{
  PeerId: number;
  Id: number;

}

