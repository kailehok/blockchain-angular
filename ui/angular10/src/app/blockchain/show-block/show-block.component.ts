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
  ActivateAddEditEmpComp:boolean=false;
  emp:any;

  show:boolean= true;
  leng: number;
  start: number;
  justClicked = false;
doubleClicked = false;

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



  ngOnInit(): void {
    this.refreshEmpList();
    this.refreshEmpPeerList();
    // console.log(this.Data);
   
   
    
  }

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
    // console.log(peerData);
    this.PeerDataList.push(peerData);

   
  
this.service.addPeerData(peerData).subscribe(res=>{
  alert(res.toString());
});
this.Data = '';

   
    // this.PeerDataList[leng-1]["Txhash"] = "dsx";
    // this.PeerDataList[leng-1]["UpdatedTxhash"] = this.PeerDataList[leng-1]["UpdatedTxhash"];
    // this.emp={
    //   Data:0,
    //   EmployeeName:"",
    //   Department:"",
    //   DateOfJoining:"",
    //   PhotoFileName:"anonymous.PNG"
    // }
    // // this.ModalTitle="Add Employee";
    // // this.ActivateAddEditEmpComp=true;

  }

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

  editClick(index){
    // console.log(this.PeerDataList[index]["UpdatedTxHash"]);
    // console.log(this.PeerDataList[index]["TxHash"]);
   

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

    
    
    
    // this.emp=item;
    // this.ModalTitle="Edit Employee";
    // this.ActivateAddEditEmpComp=true;
  }

  
  closeClick(){
    this.ActivateAddEditEmpComp=false;
    // this.refreshEmpList();
  }


  refreshEmpList(){
 
    this.service.getPeerDataList(this.Name).subscribe(data=>{
      this.PeerDataList=data;
      // console.log(this.PeerDataList)
    });
  
  }

  refreshAdminList(){
 
    this.service.getPeerDataList(this.Admin).subscribe(data=>{
      this.AdminList=data;
      console.log(this.AdminList)
    });
  
  }

  refreshEmpPeerList(){
 
    this.service.getPeerList().subscribe(data=>{
      this.PeerList=data;
 
    });
   
  
  }

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

deletePeer(name){
  var index;
 

  var leng = this.PeerId.length;
    // console.log(this)


 

  if(confirm('Are you sure you want to delete Peer ' +name+'?')){
    this.service.deletePeer(name).subscribe(data=>{
      alert(data.toString());
      this.refreshEmpPeerList();
      this.refreshEmpList();
    })
  }

  
}

  addPeer(){
    var val = {PeerName: this.Peer,
                Color: "blue"};
    

    // var val2 = {
    //   PeerDataId: this.Peer+ "1" + this.Peer,
    //   Id: 1,
    //   Peer: this.Peer,
    //   Data: "Welcome to Blockchain!",
    //   TxHash: "0x00asdffghhsssh",
    //   UpdatedTxHash: "0x00asdffghhsssh",
    //   Delete: false

    // };

    

    
    let peerData = new PeerData();
    peerData.PeerDataId = this.Peer + "1" + this.Peer ;
    peerData.Id = 1; 
    peerData.Peer = this.Peer; 
    peerData.Data = "Welcome to Blockchain"; 
    peerData.TxHash = this.hashCode("GENESIS BLOCK", peerData.Data);
    peerData.UpdatedTxHash= peerData.TxHash; 
    peerData.Deleted = false;

    var leng = this.PeerList.length;
  
   for (var i = 0; i < leng; i++) {
     if ( this.PeerList[i]["PeerName"]==this.Peer){
       alert("Peer already exists!")
      return
     }
    }
  

      this.service.addPeer(val).subscribe(res=>{
        // alert(res.toString());
      });
      this.refreshEmpPeerList();
    this.service.addPeerData(peerData).subscribe(res=>{
      // alert(res.toString());
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

  changePeer(name,index) {

    let peerData = new PeerData();
    

    var leng = this.PeerDataList.length;
    var aleng = this.AdminList.length;
    console.log(this.PeerDataList,"peer")
    console.log(this.AdminList,"admin")
  
    console.log("hello",peerData)
    console.log(aleng,leng)


    for (var i = 0; i < leng; i++) {
      peerData.PeerDataId = this.PeerDataList[i]["Peer"]+ (i+1).toString() + this.PeerDataList[i]["Peer"] ;
      peerData.Id = i+1;
      peerData.Peer = this.PeerDataList[i]["Peer"]; 
      peerData.Data = this.PeerDataList[i]["Data"]; 
      peerData.TxHash = this.PeerDataList[i]["TxHash"]; 
      peerData.UpdatedTxHash= this.PeerDataList[i]["UpdatedTxHash"]; 
      peerData.Deleted = false;
      // console.log("hello",peerData)
      this.service.updatePeerData(peerData).subscribe(res=>{
        
      });
      }

    if (this.checkStatus() == "GREEN"){
        if(leng>aleng){

          for (var i = 0; i < aleng; i++) {
            peerData.PeerDataId = this.Admin+ (i+1).toString() + this.Admin ;
            peerData.Id = i+1;
            peerData.Peer = this.Admin; 
            peerData.Data = this.PeerDataList[i]["Data"]; 
            peerData.TxHash = this.PeerDataList[i]["TxHash"]; 
            peerData.UpdatedTxHash= this.PeerDataList[i]["UpdatedTxHash"]; 
            peerData.Deleted = false;
            // console.log("hello",peerData)
            this.service.updatePeerData(peerData).subscribe(res=>{
              
            });
            }
            console.log("extra",peerData)
            

            for ( i = aleng ; i < leng; i++) {
              peerData.PeerDataId = this.Admin+ (i+1).toString() + this.Admin ;
              peerData.Id = i+1;
              peerData.Peer = this.Admin; 
              peerData.Data = this.PeerDataList[i]["Data"]; 
              peerData.TxHash = this.PeerDataList[i]["TxHash"]; 
              peerData.UpdatedTxHash= this.PeerDataList[i]["UpdatedTxHash"]; 
              peerData.Deleted = false;
              console.log("extra",peerData)
              this.service.addPeerData(peerData).subscribe(res=>{
                
              });
              }

        }
        else if(aleng>=leng){
          for (var i = 0; i < leng; i++) {
            peerData.PeerDataId = this.PeerDataList[i]["Peer"]+ (i+1).toString() +this.PeerDataList[i]["Peer"] ;
            peerData.Id = i+1;
            peerData.Peer = this.PeerDataList[i]["Peer"]; 
            peerData.Data = this.AdminList[i]["Data"]; 
            peerData.TxHash = this.AdminList[i]["TxHash"]; 
            peerData.UpdatedTxHash= this.AdminList[i]["UpdatedTxHash"]; 
            peerData.Deleted = false;
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
              // console.log("hello",peerData)
              this.service.addPeerData(peerData).subscribe(res=>{
                
              });
              }


        }
    }
    

    

    



   this.Name = name;
   // console.log(name);
   this.refreshEmpList();
   var leng = this.PeerList.length;
   // console.log(leng)
   for (var i = 0; i < leng; i++) {
     if (i == index){
      this.PeerList[i]["Color"]="red";
     }
     if (i != index){
      this.PeerList[i]["Color"]="blue";

     }
     this.refreshAdminList();

     // console.log(this.PeerList)

     
   
   
  };
}
}


  
  



export class PeerData
{
  PeerDataId: string;
  Id: number;
  Peer: string;
  Data: string;
  TxHash: string;
  UpdatedTxHash: string;
  Deleted: boolean

}

export class Peer
{
  PeerId: number;
  Id: number;

}

