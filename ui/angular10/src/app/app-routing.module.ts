import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BlockchainComponent} from './blockchain/blockchain.component';


const routes: Routes = [
{path:'hello',component:BlockchainComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
