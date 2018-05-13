import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { ShareService } from '../../services/share/share';

/**
 * Generated class for the BuscarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {
asignaturas:any=[];
tutores:any=[];
tutoresId:any=[];
tutoresAsig:any=[];
asig;
nIds=0;
nIdsAsig=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public toastCtrl:ToastController, public loadingCtrl:LoadingController,
  public alertCtrl:AlertController, public shareService:ShareService) {
    
    let loader = loadingCtrl.create({
      content: "Por favor espere...",
      //duration: 3000
    });
    loader.present();

    var that=this;
    this.asignaturas.push('--------------------------');
    this.asig=0;

    var asignaturasRef=firebase.database().ref('asignaturas/');

    asignaturasRef.orderByChild('id').once('value').then(function(snap){
      console.log(snap.key);
      snap.forEach(function(data){
      that.asignaturas.push(data.val().asignatura);
      that.nIdsAsig+=1;
      });
    }).then(function(){
      loader.dismiss();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }

buscar()
{
  var tutoresRef=firebase.database().ref('tutores/');
  var perfilesRef=firebase.database().ref('usuarios/perfiles');
  var asignatura=this.asignaturas[this.asig];
  var that=this;
  this.tutoresId=[];
  this.tutoresAsig=[];
  this.tutores=[];

  perfilesRef.once('value').then(function(snap){
    snap.forEach(function(data){
      that.tutores.push({'nombre':data.val().nombre,'apellido':data.val().apellido,
        'telefono':data.val().telefono,'emailCont':data.val().emailContac,'genero':data.val().genero,
        'descrip':data.val().descripcion,'id':data.val().id, 'reputacion':data.val().reputacion});
    });
  }).then(function(){
    if (that.asig==0)
    {
    let toast = that.toastCtrl.create({
      message: 'Debe seleccionar alguna asignatura.',
      position: 'top',
      duration: 3000
    });
    toast.present();
    }
    else
    {
      let loader = that.loadingCtrl.create({
        content: "Por favor espere...",
        //duration: 3000
      });
      loader.present();

      tutoresRef.orderByKey().once('value').then(function(snap){
        snap.forEach(function(data){
          if (data.val().asignatura==asignatura || data.val().asignatura2==asignatura)
          {
            //console.log(data.key);
            that.tutoresId.push(data.key);
            that.nIdsAsig+=1;
          }
        });
        loader.dismiss();
      }).then(function(){
            if (that.tutoresId.length==0)
            {
              let toast = that.toastCtrl.create({
                message: 'Parece que no hay tutores disponibles para esa asignatura...',
                position: 'top',
                duration: 3000
              });
              toast.present();
            }
            else
            { 
              let loader2 = that.loadingCtrl.create({
              content: "Procesando...",
              //duration: 3000
              });
              loader2.present();
              that.generarLista();
              if (that.tutoresAsig.length==0)
            {
              let toast = that.toastCtrl.create({
                message: 'Parece que no hay tutores disponibles para esa asignatura...',
                position: 'top',
                duration: 3000
              });
              toast.present();
            }
          
              loader2.dismiss();

          }
      });
    }
});
}

generarLista()
{
    var that=this;
    var shs=this.shareService;

    that.tutoresId.forEach(function(value){
      //console.log(typeof(value));
      for (var c=0;c<that.tutores.length;c++)
      {
        if(value==(+(that.tutores[c].id)) && value!=shs.getId())
        that.tutoresAsig.push({'nombre':that.tutores[c].nombre,'apellido':that.tutores[c].apellido,
        'telefono':that.tutores[c].telefono,'emailCont':that.tutores[c].emailCont,
        'genero':that.tutores[c].genero,'descrip':that.tutores[c].descrip,
        'id':that.tutores[c].id,'reputacion':that.tutores[c].reputacion})

        console.log(that.tutoresAsig);
    }
    })
  ;
}

msg(i)
{
  var msgRef=firebase.database().ref("mensajes/"+this.tutoresAsig[i].id);
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
          console.log(data.Mensaje);
          console.log(this.tutoresAsig[i].id);
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

contac(i)
{
  var shs=this.shareService;
  var contacRef=firebase.database().ref("usuarios/contactos/"+shs.getId());
  var that=this;
  var contacto=false;
  var contac:any=[];

  contacRef.once('value').then(function(snap){
    snap.forEach(function(data){
      contac.push(data.val().contacto);
    });

  }).then(function(){

  contac.forEach(function(element) {
    if (element==that.tutoresAsig[i].id)
      contacto=true;
  });

  if (contacto==false){
  contacRef.push({"contacto":that.tutoresAsig[i].id,"voto":'n'}).then(function(){

  let toast = that.toastCtrl.create({
    message: 'Contacto agregado.',
    position: 'top',
    duration: 4000
  });
  toast.present();
});
  }
  else
    {
      let toast = that.toastCtrl.create({
        message: 'Este usuario ya esta en sus contactos.',
        position: 'top',
        duration: 4000
      });
      toast.present();
    }
});

}
}
