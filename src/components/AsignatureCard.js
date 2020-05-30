import React from 'react';

const Ejes = {
  BASICO: 0,
  COMUN: 1,
  PROFESIONAL: 2,
  ESPECIALIZANTE: 3,
  INTEGRADOR: 4
}

export default class AsignatureCard extends React.Component {

    render() {
      let color;
      if(materia.eje === Ejes.BASICO) {
        color = "#F8F8F9";
      }
      if(materia.eje === Ejes.COMUN) {
        color = "#F0F061";
      }
      if(materia.eje === Ejes.PROFESIONAL) {
        color = "#FB9B63";
      }
      if(materia.eje === Ejes.ESPECIALIZANTE) {
        color = "#98F662";
      }
      if(materia.eje === Ejes.INTEGRADOR) {
        color = "#9962F8";
      }

      return (
        <div>
            MATERIA
        </div>
      )
    }
  }
