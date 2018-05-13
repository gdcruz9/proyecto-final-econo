import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,
AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';

import {ShareService} from '../../services/share/share';
import { HomePage } from '../home/home';

/**
 * Generated class for the AyudarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ayudar',
  templateUrl: 'ayudar.html',
})
export class AyudarPage {
asignaturas:any=[];
asignaturas2:any=[];
asig;
asig2;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public loadingCtrl: LoadingController, public toastCtrl:ToastController,
    public shareService:ShareService, public alertCtrl:AlertController) {
    var that=this;
    that.asignaturas.push('------------------------');
    that.asignaturas2.push('------------------------');

    var asignaturasRef=firebase.database().ref('asignaturas/');
      let loader =that.loadingCtrl.create({
        content: "Cargando...",
      });
      loader.present();
   
    asignaturasRef.once('value').then(function(snap){ 
        snap.forEach(function(datos){
          console.log(datos.val().id);
          that.asignaturas.push(datos.val().asignatura);
          that.asignaturas2.push(datos.val().asignatura);
        })
        that.asig=0;
        that.asig2=0;
        loader.dismiss();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AyudarPage');
  }

registrar()
{
  var shs=this.shareService;
  var tutor;
  var asignatura;
  var asignatura2;
  var id=shs.getId();

  if (this.asig==0 && this.asig2==0)
  {
    let toast = this.toastCtrl.create({
      message: 'Debe seleccionar al menos una asignatura.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  else{
    if (this.asig!=this.asig2)
    {
    var tutoresRef=firebase.database().ref('tutores/'+id);
    tutor=shs.getEmailLogin();
      if(this.asig==0 && this.asig2>0)
      {
        console.log(this.asignaturas2[this.asig2]);
        asignatura2=this.asignaturas2[this.asig2];
        tutoresRef.set({'asignatura':asignatura2});
      }
      else if(this.asig>0 && this.asig2==0)
      { 
        console.log(this.asignaturas[this.asig]);
        asignatura=this.asignaturas[this.asig];
        tutoresRef.set({'asignatura':asignatura});
      }
      else
      {
        console.log(this.asignaturas[this.asig]);
        console.log(this.asignaturas2[this.asig2]);
        asignatura=this.asignaturas[this.asig];
        asignatura2=this.asignaturas2[this.asig2];
        tutoresRef.set({'asignatura':asignatura,'asignatura2':asignatura2});
      }
      let alert = this.alertCtrl.create({
        title: 'Exito!',
        subTitle: 'Ha sido los datos han sido escritos.',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(HomePage);
    }
    else
    {
      let toast = this.toastCtrl.create({
        message: 'No puede seleccionar la misma asignatura 2 veces.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }
}

}
