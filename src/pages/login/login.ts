import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {ShareService} from '../../services/share/share'
import {HomePage} from '../home/home'
import * as firebase from 'firebase/app'
import { isEmpty } from '@firebase/util';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
loginEmail;
passwd;
perfil:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public shareService:ShareService, public alertCtrl:AlertController, public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

login()
{
  var perfilRef=firebase.database().ref('usuarios/perfiles/')
  var registradosRef=firebase.database().ref('usuarios/registrados/')
  var nvctrl=this.navCtrl;
  var prfls:any;
  var lgEmail=this.loginEmail;
  var shs=this.shareService;
  var pswd=this.passwd;
  var that=this;

  if (this.loginEmail==undefined || this.passwd==undefined)
  {
    let alert3 = that.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Email o contraseña vacia!',
      buttons: ['OK']
    });
    alert3.present();
  }
  else
  {
  let loader2 = that.loadingCtrl.create({
    content: "Espere...",
    //duration: 3000
    });
    loader2.present();
  
  perfilRef.orderByChild("emailLogin").equalTo(this.loginEmail).once('value').then(function(snap) {
    snap.forEach(function(data){
    prfls={'nombre':data.val().nombre,'apellido':data.val().apellido,
                        'emailContac':data.val().emailCont,'emailLogin':lgEmail,
                        'telefono':data.val().tel,'genero':data.val().gen,
                        'carrera':data.val().carr,'descripcion':data.val().desc,
                        'id':data.val().id,'reputacion':data.val().reputacion};
    })
  }).then(function(){ 
    
  firebase.auth().signInWithEmailAndPassword(lgEmail, pswd).then(function(){
    console.log('%');
    if (prfls==null)
    {
      prfls={'nombre':"",'apellido':"",
      'emailContac':"",'emailLogin':lgEmail,
      'telefono':"",'genero':"",
      'carrera':"",'descripcion':"",'id':0,'reputacion':0};
      registradosRef.push({"loginEmail":lgEmail,"reg":0})
    }
    
    shs.setNombre(prfls.nombre);
    shs.setApellido(prfls.apellido);
    shs.setEmailContact(prfls.emailContac);
    shs.setEmailLogin(prfls.emailLogin);
    shs.setTelefono(prfls.telefono);
    shs.setGenero(prfls.genero);
    shs.setCarrera(prfls.carrera);
    shs.setDescripcion(prfls.descripcion);
    shs.setId(prfls.id);
    shs.setReputacion(prfls.reputacion);
    loader2.dismiss();
    nvctrl.push(HomePage);
  })
  .catch(function(error) {
    loader2.dismiss();
    let alert = that.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Error en la autentcacion, usuario o contraseña no valida',
      buttons: ['OK']
    });

    alert.present();
    console.log(error.code);
    console.log(error.message);
 });

});
  }
}

}
