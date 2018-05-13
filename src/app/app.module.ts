import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ShareService } from '../services/share/share';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AyudarPage } from '../pages/ayudar/ayudar';
import { BuscarPage } from '../pages/buscar/buscar';
import { CrearPerfilPage } from '../pages/crear-perfil/crear-perfil';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';
import { LeerSolicitudesPage } from '../pages/leer-solicitudes/leer-solicitudes';
import { ContactosPage } from '../pages/contactos/contactos';

import * as firebase from 'firebase/app'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';

export const firebaseConfig = {
apiKey: "AIzaSyB_O6-t7pGgpg1_5JHgEip6_u1ITFCCs34",
authDomain: "proyecto-final-142ae.firebaseapp.com",
databaseURL: "https://proyecto-final-142ae.firebaseio.com",
projectId: "proyecto-final-142ae",
storageBucket: "proyecto-final-142ae.appspot.com",
messagingSenderId: "426362984806"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AyudarPage,
    LoginPage,
    BuscarPage,
    CrearPerfilPage,  
    EditarPerfilPage,
    LeerSolicitudesPage,
    ContactosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AyudarPage,
    LoginPage,
    BuscarPage,
    CrearPerfilPage,
    EditarPerfilPage,
    LeerSolicitudesPage,
    ContactosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShareService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
