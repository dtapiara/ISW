import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class SolicitudesCompraService {

  constructor(private http: Http) { }

  encontrarID2(id: any){
    return this.http.post('/api/encontrar_id2', {"id": id});
  }

  encontrarSolicitudesCompra(id:any){
    return this.http.post('/api/encontrar_solicitudescompra', {"id": id});
  }
  encontrarProveedores(){
    return this.http.get('http://localhost:3004/proveedor');
  }
  encontrarMateriales(){
    return this.http.get('http://localhost:3004/materiales');
  }
  enviarOrden(model:any){
    return this.http.post('http://localhost:3004/orden', {"material":model.nombre_material, "proveedor": model.resto.proveedor_id, "precio": model.resto.precio});
  }
}
