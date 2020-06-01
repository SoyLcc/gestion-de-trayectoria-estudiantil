import React from 'react';

const AXIS = {
  BASICO: 'B',
  COMUN: 'C',
  PROFESIONAL: 'P',
  ESPECIALIZANTE: 'E',
  INTEGRADOR: 'I'
}

const SubjectCard = ({ subject }) => {
  let color;
  if(subject.axis === AXIS.BASICO) {
    color = "#F8F8F9";
  }
  if(subject.axis === AXIS.COMUN) {
    color = "#F0F061";
  }
  if(subject.axis === AXIS.PROFESIONAL) {
    color = "#FB9B63";
  }
  if(subject.axis === AXIS.ESPECIALIZANTE) {
    color = "#98F662";
  }
  if(subject.axis === AXIS.INTEGRADOR) {
    color = "#9962F8";
  }
  return (
    <div className="col" style={{backgroundColor:color}}>
      { subject.name }
    </div>
  );
} 

export default SubjectCard;