import { Component } from '@angular/core';
import { NavController,NavParams,AlertController,ToastController } from 'ionic-angular';
import { ShareService } from '../../services/share/share';
import * as firebase from 'firebase/app'; 
import { isEmpty } from '@firebase/util';

import { LoginPage } from '../login/login';
import { AyudarPage } from '../ayudar/ayudar';
import { BuscarPage } from '../buscar/buscar';
import { CrearPerfilPage } from '../crear-perfil/crear-perfil';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil';
import { LeerSolicitudesPage } from '../leer-solicitudes/leer-solicitudes';
import { ContactosPage } from '../contactos/contactos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
crearDeshab=false;
editarDeshab=true;
nombre;
apellido;

  constructor(public navCtrl: NavController, public shareService:ShareService,
  public toastCtrl:ToastController) { 
    this.nombre=shareService.getNombre();
    this.apellido=shareService.getApellido();
    
    var usuariosReg:any=[];
    var cD=this.crearDeshab;
    var eD=this.editarDeshab;
    var shs=shareService;
    var usuariosRef=firebase.database().ref('usuarios/perfiles');

    if (shs.getNombre()==""){
      this.crearDeshab=false;
      this.editarDeshab=true;

        let toast = this.toastCtrl.create({
          message: 'Usted no tiene un perfil, por favor debe crear uno para continuar.',
          duration: 4000,
          position: 'top'
        });
        toast.present();
      console.log("1st");
    }
    else{
      this.crearDeshab=true;
      this.editarDeshab=false;
      console.log("+");   
    }


  }

buscar()
{
  this.navCtrl.push(BuscarPage);
}

ayudar()
{
  this.navCtrl.push(AyudarPage);
}

crear()
{
  this.navCtrl.push(CrearPerfilPage);
}

editar()
{
  this.navCtrl.push(EditarPerfilPage);
}

leer()
{
  this.navCtrl.push(LeerSolicitudesPage);
}

contactos()
{
  this.navCtrl.push(ContactosPage);
}

salir()
{
  var nvCt=this.navCtrl;

  firebase.auth().signOut().then(function() {
    console.log("Logged out!")
    nvCt.push(LoginPage);
 }, function(error) {
    console.log(error.code);
    console.log(error.message);
 });

}

}
