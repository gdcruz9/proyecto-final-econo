import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {
	
    nombre: string;
    apellido: string;
    emailContacto: string;
    emailLogin: string;
    pwd: string;
    telefono:string;
    carrera:string;
    descripcion:string;
    genero:string;
    id:number;
    reputacion:number;

    constructor() {
        this.nombre = 'Blank';
        this.apellido = 'Name';
        this.emailLogin= 'Empty'
        this.emailContacto = 'Name';
        this.pwd = 'Name';
        this.telefono='00000';
        this.carrera='Blank';
        this.descripcion='Blank';
        this.genero='Blank';
        this.id=0;
        this.reputacion=0;
    }
 
    setNombre(nombre) {
        this.nombre = nombre;
    }

    setApellido(apellido) {
        this.apellido = apellido;       
    }

    setEmailLogin(eml) {
      this.emailLogin=eml;
    }

    setEmailContact(emc) {
        this.emailContacto=emc;
    }

    setPswd(psswd) {
        this.pwd=psswd;
    }

    setTelefono(tel)
    {
        this.telefono=tel;
    }

    setCarrera(carr)
    {
        this.carrera=carr;
    }
 
    setDescripcion(desc)
    {
        this.descripcion=desc;
    }

    setGenero(gen)
    {
        this.genero=gen;
    }

    setId(id)
    {
        this.id=id;
    }

    setReputacion(rep)
    {
        this.reputacion=rep;
    }

    getNombre() {
        return this.nombre;
    }

    getApellido() {
        return this.apellido;       
    }

    getEmailLogin() {
      return this.emailLogin;
    }

    getEmailContact() {
        return this.emailContacto;
    }

    getPswd() {
        return this.pwd;
    }

    getTelefono()
    {
        return this.telefono;
    }

    getCarrera()
    {
        return this.carrera;
    }
 
    getDescripcion()
    {
        return this.descripcion;
    }

    getGenero()
    {
        return this.genero;
    }

    getId()
    {
        return this.id;
    }

    getReputacion()
    {
        return this.reputacion;
    }
}