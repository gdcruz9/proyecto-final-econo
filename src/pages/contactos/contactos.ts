import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { ShareService } from '../../services/share/share';
import { empty } from 'rxjs/Observer';

/**
 * Generated class for the ContactosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html',
})
export class ContactosPage {
contactos:any=[];
perfiles:any=[];
perfUsuario:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public shareService:ShareService,
  public loadingCtrl:LoadingController,public toastCtrl:ToastController, public alertCtrl:AlertController) {
    this.cargar();
    //console.log(this.contactos);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactosPage');
  }

  cargar()
  {
    var shs=this.shareService;
    var contactosRef=firebase.database().ref('usuarios/contactos/'+shs.getId());
    var perfilesRef=firebase.database().ref('usuarios/perfiles/');
    var that=this;
 
    let loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      //duration: 3000
    });
    loader.present();

    this.contactos.length=0;
    this.perfiles.length=0;
    this.perfUsuario.length=0;

    //console.log(shs.getId());
  
    perfilesRef.once('value').then(function(snap){
      snap.forEach(function(data){
        that.perfiles.push({'key':data.key,'nombre':data.val().nombre,'apellido':data.val().apellido,
          'telefono':data.val().telefono,'emailCont':data.val().emailContac,'genero':data.val().genero,
          'descrip':data.val().descripcion,'id':data.val().id, 'reputacion':data.val().reputacion});
      });
    }).then(function(){
        contactosRef.once('value').then(function(snap){
          snap.forEach(function(data){
            that.contactos.push({"contacto":data.val().contacto,"voto":data.val().voto,"key":data.key})
          })
        }).then(function(){
    console.log("in")
    for (var i=0;i<that.contactos.length;i++)
        for (var c=0;c<that.perfiles.length;c++)
        {
          if (that.contactos[i].contacto==that.perfiles[c].id)
            that.perfUsuario.push(that.perfiles[c]);
        }  

        loader.dismiss();

        if (that.perfUsuario.length==0)
        {
          let toast = that.toastCtrl.create({
            message: 'No tiene contactos.',
            position: 'top',
            duration: 4000
          });
          toast.present();
        }

  })
    })

}

repUp(i)
{
  var shs=this.shareService;
  var repRef=firebase.database().ref("usuarios/perfiles/"+this.perfUsuario[i].key);
  var contRef=firebase.database().ref("usuarios/contactos/"+shs.getId()+"/"+this.contactos[i].key);
  var rep=parseInt(this.perfUsuario[i].reputacion);

  rep+=1;
 
  if (this.contactos[i].voto=="d" || this.contactos[i].voto=="n")
  {
    repRef.update({"reputacion":rep,"voto":'u'});
    contRef.update({"voto":'u'});
    this.cargar();
  }
}

repDown(i)
{
  var shs=this.shareService;
  var contRef=firebase.database().ref("usuarios/contactos/"+shs.getId()+"/"+this.contactos[i].key);
  var repRef=firebase.database().ref("usuarios/perfiles/"+this.perfUsuario[i].key);
  var rep=parseInt(this.perfUsuario[i].reputacion);

  if (rep>0)
    rep-=1;
  else
    rep=0;
  
  if (this.contactos[i].voto=="u" || this.contactos[i].voto=="n")
  {
    repRef.update({"reputacion":rep,"voto":'d'});
    contRef.update({"voto":'d'});
    this.cargar();
  }
}

msg(i)
{
  var msgRef=firebase.database().ref("mensajes/"+this.perfUsuario[i].id);
  var shs=this.shareService;
  
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
          msgRef.push({"id":shs.getId(),"nombre":shs.getNombre(),
          "apellido":shs.getApellido(),"msg":data.Mensaje,"leido":0});

          let toast = this.toastCtrl.create({
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
  console.log(i);
 
}

}
