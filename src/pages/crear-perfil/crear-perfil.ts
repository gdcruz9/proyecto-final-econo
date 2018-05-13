import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { ShareService } from '../../services/share/share';
import { HomePage } from '../home/home';
import { sha1 } from '@firebase/database/dist/esm/src/core/util/util';

/**
 * Generated class for the CrearPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-perfil',
  templateUrl: 'crear-perfil.html',
})
export class CrearPerfilPage {
generos:any=[];
carreras:any=[];
nombre;
apellido;
email;
telefono;
descripcion;
genero=0;
carrera=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public shareService:ShareService, public alertCtrl:AlertController) {
    this.generos.push('------------------------')
    this.generos.push('M')
    this.generos.push('F')
    this.generos.push('?')
    var that=this;
    var carreras:any=[];
    this.carreras.push('-----------------------')

    var carrerasRef=firebase.database().ref('carreras/');

    carrerasRef.orderByChild('id').on('child_added',function(data){
      console.log(data.val().id);
      that.carreras.push(data.val().carrera);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPerfilPage');
  }

crear()
{
  var shs=this.shareService;
  var that=this;
  var perfilRef=firebase.database().ref('usuarios/perfiles/');

  var idRef=firebase.database().ref('mantenimiento/idactual/');

  idRef.once('value').then(function(data){
    console.log(data.val());
    shs.setId(data.val())
  })

  if (this.nombre==undefined || this.apellido==undefined || this.email==undefined || this.descripcion==undefined || this.telefono==undefined || this.carrera==0 || this.genero==0)
    {
      let alert = that.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Algunos de sus datos son nulos o no validos, revise de nuevo.',
        buttons: ['OK']
      });

      alert.present();
    }
    else
    {
  
  perfilRef.push({'nombre':this.nombre,'apellido':this.apellido,
      'emailContac':this.email,'emailLogin':shs.getEmailLogin(),
      'telefono':this.telefono,'genero':this.generos[this.genero],
      'carrera':this.carreras[this.carrera],'descripcion':this.descripcion,
      'id':shs.getId(),'reputacion':0}).then(function(){
        
        let alert = that.alertCtrl.create({
          title: 'Exito!',
          subTitle: 'Su perfil ha sido creado con exito.',
          buttons: ['OK']
        });
        shs.setNombre(that.nombre);
        shs.setApellido(that.apellido);
        shs.setEmailContact(that.email);
        shs.setTelefono(that.telefono);
        shs.setGenero(that.genero);
        shs.setCarrera(that.carrera);
        shs.setDescripcion(that.descripcion);
        shs.setReputacion(0);
        idRef.set(shs.getId()+1);
        alert.present();
      that.navCtrl.push(HomePage)
      });
    }
}

}
