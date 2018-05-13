import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { ShareService } from '../../services/share/share';
import { HomePage } from '../home/home';
import { sha1 } from '@firebase/database/dist/esm/src/core/util/util';
/**
 * Generated class for the EditarPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {
  generos:any=[];
  carreras:any=[];
  nombre;
  apellido;
  email;
  telefono;
  descripcion;
  genero;
  carrera;
  llave;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, 
      public shareService:ShareService, public alertCtrl:AlertController) {
      
      var shs=this.shareService;
      this.generos.push('-------------')
      this.generos.push('M')
      this.generos.push('F')
      this.generos.push('?')
      var that=this;
      var carreras:any=[];
      this.carrera=0;
      this.genero=0;
      
      this.carreras.push("---------------");
      var carrerasRef=firebase.database().ref('carreras/');
        
      var perfilRef=firebase.database().ref('usuarios/perfiles/');

      perfilRef.orderByChild("emailLogin").equalTo(shs.getEmailLogin()).once('value').then(function(snap) {
        snap.forEach(function(data){
          that.llave=data.key;
          console.log(that.llave);
        })
      })

      carrerasRef.orderByChild('id').on('child_added',function(data){
        console.log(data.val().id);
        console.log(data.key);
        that.carreras.push(data.val().carrera);
      });
    
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad CrearPerfilPage');
    }
  
  actualizar()
  {
    var shs=this.shareService;
    var that=this;
    var perfilRef=firebase.database().ref('usuarios/perfiles/'+this.llave);

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
    perfilRef.update({'nombre':this.nombre,'apellido':this.apellido,
        'emailContac':this.email,'emailLogin':shs.getEmailLogin(),
        'telefono':this.telefono,'genero':this.generos[this.genero],
        'carrera':this.carreras[this.carrera],'descripcion':this.descripcion,
        'id':shs.getId(),'reputacion':shs.getReputacion()}).then(function(){
          
          let alert = that.alertCtrl.create({
            title: 'Exito!',
            subTitle: 'Su perfil ha sido actualizado con exito.',
            buttons: ['OK']
          });

          shs.setNombre(that.nombre);
          shs.setApellido(that.apellido);
          shs.setEmailContact(that.email);
          shs.setTelefono(that.telefono);
          shs.setGenero(that.genero);
          shs.setCarrera(that.carrera);
          shs.setDescripcion(that.descripcion);
          alert.present();
        that.navCtrl.push(HomePage)
        });
  }
  }
}
