import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { ShareService } from '../../services/share/share';

/**
 * Generated class for the LeerSolicitudesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leer-solicitudes',
  templateUrl: 'leer-solicitudes.html',
})
export class LeerSolicitudesPage {
mensajes:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl:ToastController, public loadingCtrl:LoadingController,
    public alertCtrl:AlertController, public shareService:ShareService) {
    var shs=shareService;
    var that=this;
    var msgRef=firebase.database().ref("mensajes/"+shs.getId());

    let loader = loadingCtrl.create({
      content: "Cargando...",
      duration: 3000
    });
    loader.present();

    msgRef.orderByChild('id').once('value').then(function(snap){
      snap.forEach(function(data){
        console.log(data.val().id);
        that.mensajes.push({"id":data.val().id,"nombre":data.val().nombre,"apellido":data.val().apellido,
        "mensaje":data.val().msg});
        });
      }).then(function(){
        loader.dismiss();

        if (that.mensajes.length==0)
        {
          let toast = that.toastCtrl.create({
            message: 'Parece que no tiene mensajes...',
            position: 'top',
            duration: 4000
          });
          toast.present();
        }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeerSolicitudesPage');
  }

  responder(id)
  {
    var shs=this.shareService;
    var msgRef=firebase.database().ref("mensajes/"+id);
    var that=this;

    let prompt = this.alertCtrl.create({
      title: 'Mensajes',
      message: "Escriba un mensaje a este usuario",
      inputs: [
        {
          name: 'Mensaje',
          placeholder: 'mensaje'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log(data.Mensaje);
            msgRef.push({"id":shs.getId(),"nombre":shs.getNombre(),
            "apellido":shs.getApellido(),"msg":data.Mensaje,"leido":0});
  
            let toast = that.toastCtrl.create({
              message: 'Su mensaje fue enviado',
              position: 'top',
              duration: 4000
            });
            toast.present();
          }
        }
      ]
    });
    prompt.present();

    console.log("id: "+id)
  }
}
