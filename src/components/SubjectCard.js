import React from 'react';
import styled from 'styled-components';

const AXIS = {
  BASICO: 'B',
  COMUN: 'C',
  PROFESIONAL: 'P',
  ESPECIALIZANTE: 'E',
  INTEGRADOR: 'I'
}

const CardContainer = styled.div`
  width: 118px !important;
  height: 50px !important;
  border: 1px solid;
  font-size: 9px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif !important;
`;

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
    <CardContainer style={{backgroundColor:color}}>
      { subject.name }
    </CardContainer>
  );
} 

export default SubjectCard;