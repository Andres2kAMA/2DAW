"use strict";

import * as plantilla from "./plantilla_Html.js";
import * as funcionesFirebase from "./funciones_Firebase.js";

let productosLista = [];
/**
 * Declaro todos los eventos del inicio del programa.
 */
function declararEventosInicio() {
  document.getElementById("productos").addEventListener("click", function () {
    plantilla.eliminarPlantillasInsertadas();
    plantilla.insertarPlantillaHeaderProducto();
    plantilla.insertarPlantillaProductos();
    plantilla.insertarPlantillaFooter();
    funcionesFirebase.mostrarTodosProductos();
    declararEventosSeccionProducto();
    declararEventoRedirigirInicio();
  });

  document.getElementById("listas").addEventListener(
    "click",
    function () {
      plantilla.eliminarPlantillasInsertadas();
      plantilla.insertarPlantillaHeaderLista();
      plantilla.insertarPlantillaDivListas();
      funcionesFirebase.mostrarTodasLasListas();
      plantilla.insertarPlantillaFooter();
      declararEventosSeccionLista();
      declararEventoRedirigirInicio();
    },
    false
  );
}

/**
 * Declaro un evento para cargar el inicio del programa.
 */
function declararEventoRedirigirInicio() {
  document.getElementById("inicio").addEventListener(
    "click",
    function () {
      plantilla.eliminarPlantillasInsertadas();
      plantilla.insertarPlantillaHeaderInicio();
      plantilla.insertarPlantillaPresentacion();
      plantilla.insertarPlantillaFooter();
      declararEventosInicio();
    },
    false
  );
}

/**
 * Declaro los eventos de la sección de productos de la página web.
 */
function declararEventosSeccionProducto() {
  document.getElementById("mostrarProductos").addEventListener(
    "click",
    function () {
      plantilla.eliminarProductosInsertados();
      plantilla.insertarPlantillaProductos();
      funcionesFirebase.mostrarTodosProductos();
    },
    false
  );

  document.getElementById("ordenarProductos").addEventListener(
    "click",
    function () {
      plantilla.eliminarProductosInsertados();
      plantilla.insertarPlantillaProductos();
      funcionesFirebase.ordenarProductos();
    },
    false
  );

  document.getElementById("filtrarProductos").addEventListener(
    "click",
    function () {
      plantilla.eliminarProductosInsertados();
      plantilla.eliminarFooter();
      plantilla.insertarPlantillaFormularioFiltrarProductos();
      plantilla.insertarPlantillaFooter();
      declararEventosFiltradoProductos();
    },
    false
  );
}

/**
 * Declaro los eventos para filtrar cada producto.
 */
function declararEventosFiltradoProductos() {
  document.getElementById("filtrarProductoNombre").addEventListener(
    "click",
    function () {
      let datoFormulario =
        devolverDatosFormularioFiltrarProducto("formNombreProducto");

      plantilla.eliminarFormularioFiltrarProductos();

      if (datoFormulario != "")
        funcionesFirebase.filtrarProductosPorNombre(datoFormulario);
    },
    false
  );

  document.getElementById("filtrarProductoPrecio").addEventListener(
    "click",
    function () {
      let datoFormulario =
        devolverDatosFormularioFiltrarProducto("formPrecioProducto");

      plantilla.eliminarFormularioFiltrarProductos();

      if (datoFormulario >= 0)
        funcionesFirebase.filtrarProductosPorNumero(datoFormulario, "precio");
    },
    false
  );

  document.getElementById("filtrarProductoPeso").addEventListener(
    "click",
    function () {
      let datoFormulario =
        devolverDatosFormularioFiltrarProducto("formPesoProducto");

      plantilla.eliminarFormularioFiltrarProductos();

      if (datoFormulario >= 0)
        funcionesFirebase.filtrarProductosPorNumero(datoFormulario, "peso");
    },
    false
  );
}

/**
 *
 * @param {String} nombreFormulario
 * @returns Devuelvo el valor del formulario.
 */
function devolverDatosFormularioFiltrarProducto(nombreFormulario) {
  let formulario = document.getElementById(nombreFormulario);
  return formulario[0].value;
}

function declararEventosSeccionLista() {
  document.getElementById("crearLista").addEventListener(
    "click",
    function () {
      plantilla.eliminarListasInsertadas();
      plantilla.eliminarFooter();
      plantilla.insertarPlantillaFormularioCrearLista();
      plantilla.insertarPlantillaFooter();
      declararEventoCrearLista();
    },
    false
  );
}

function declararEventoCrearLista() {
  document.getElementById("botonCrearLista").addEventListener(
    "click",
    function () {
      let datosFormCrearLista = obtenerDatosFormularioCrearLista();
      let lista = crearObjetoLista(datosFormCrearLista);
      funcionesFirebase.anyadirLista(lista);
      plantilla.eliminarFormularioCrearLista();
      plantilla.eliminarFooter();
      plantilla.insertarPlantillaDivListas();
      funcionesFirebase.mostrarTodasLasListas();
      plantilla.insertarPlantillaFooter();
    },
    false
  );
}

function obtenerDatosFormularioCrearLista() {
  let form = document.getElementById("formularioCrearLista");
  let datosForm = [];
  for (let i = 0; i < form.length - 1; i++) {
    datosForm.push(form[i].value);
  }

  return datosForm;
}

function obtenerDatosFormularioActualizarLista() {
  let form = document.getElementById("formularioActualizarLista");
  let datosForm = [];
  for (let i = 0; i < form.length - 1; i++) {
    datosForm.push(form[i].value);
  }

  return datosForm;
}

function crearObjetoLista(datos) {
  let lista = {
    nombrePropietario: datos[0],
    nombreLista: datos[1],
    fechaCreacion: datos[2],
    productos: [],
  };

  return lista;
}

function anyadirEventosLista(id) {
  document.getElementById(`editar${id}`).addEventListener(
    "click",
    function () {
      plantilla.eliminarListasInsertadas();
      plantilla.eliminarFooter();
      plantilla.insertarPlantillaFormularioActualizarLista();
      plantilla.insertarPlantillaFooter();
      declararEventoActualizarLista(id);
    },
    false
  );

  document.getElementById(`anyadir${id}`).addEventListener(
    "click",
    function () {
      plantilla.eliminarListasInsertadas();
      plantilla.eliminarFooter();
      plantilla.insertarPlantillaProductos();
      funcionesFirebase.mostrarTodosProductosAnyadir();
      plantilla.insertarBotonAnyadirProductosLista();
      plantilla.insertarPlantillaFooter();
      declararEventoAnyadirProductosFireBase(id);
    },
    false
  );

  document.getElementById(`mostrar${id}`).addEventListener(
    "click",
    function () {
      plantilla.eliminarListasInsertadas();
      plantilla.eliminarFooter();
      plantilla.insertarPlantillaProductos();
      funcionesFirebase.mostrarTodosProductosLista(id);
      plantilla.insertarPlantillaFooter();
    },
    false
  );

  document.getElementById(`eliminar${id}`).addEventListener(
    "click",
    function () {
      funcionesFirebase.eliminarLista(id);
      plantilla.eliminarListasInsertadas();
      plantilla.eliminarFooter();
      plantilla.insertarPlantillaDivListas();
      funcionesFirebase.mostrarTodasLasListas();
      plantilla.insertarPlantillaFooter();
    },
    false
  );
}

function declararEventoActualizarLista(id) {
  document.getElementById("botonActualizarLista").addEventListener(
    "click",
    function () {
      let datosFormCrearLista = obtenerDatosFormularioActualizarLista();
      funcionesFirebase.actualizarLista(datosFormCrearLista, id);
      plantilla.eliminarFormularioActualizarLista();
      plantilla.eliminarFooter();
      plantilla.insertarPlantillaDivListas();
      funcionesFirebase.mostrarTodasLasListas();
      plantilla.insertarPlantillaFooter();
    },
    false
  );
}

function declararEventoAnyadirProducto(idHtml, id) {
  document.getElementById(idHtml).addEventListener("click", function () {
    productosLista.push(id);
    let divProductos = document.getElementById("divProductos");
    let mensaje = document.createElement("p");
    mensaje.id = "mensaje";
    mensaje.innerHTML = `El producto con id ${id} añadido corréctamente`;

    if (document.getElementById("mensaje") != null) {
      divProductos.removeChild(document.getElementById("mensaje"));
    }
    divProductos.prepend(mensaje);
  });
}

function declararEventoAnyadirProductosFireBase(id) {
  document.getElementById("anyadirProductosLista").addEventListener(
    "click",
    function () {
      if (document.getElementById("mensaje") != null) {
        divProductos.removeChild(document.getElementById("mensaje"));
      }

      funcionesFirebase.anyadirProductosLista(productosLista, id);
      productosLista = [];

      plantilla.eliminarProductosInsertados();
      plantilla.eliminarBotonAnyadirProductos();
      plantilla.eliminarFooter();
      plantilla.insertarPlantillaDivListas();
      funcionesFirebase.mostrarTodasLasListas();
      plantilla.insertarPlantillaFooter();
    },
    false
  );
}

export {
  declararEventosInicio,
  anyadirEventosLista,
  declararEventoAnyadirProducto,
};