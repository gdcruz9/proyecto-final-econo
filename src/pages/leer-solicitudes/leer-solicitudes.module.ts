import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeerSolicitudesPage } from './leer-solicitudes';

@NgModule({
  declarations: [
    LeerSolicitudesPage,
  ],
  imports: [
    IonicPageModule.forChild(LeerSolicitudesPage),
  ],
})
export class LeerSolicitudesPageModule {}
