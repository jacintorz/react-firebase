import React, { useState } from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';

const Input = styled.input`
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  width: 100%;
  margin-bottom: 10px;
  transition: 0.2s ease all;
  outline: none;
  text-align: center;

  &:focus {
    border: 2px solid #3d76e9;
  }
`;

const Boton = styled.button`
  padding: 10px 30px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  transition: 0.3s ease all;
  outline: none;
  background: #c4c4c4;
  color: #fff;
  font-size: 12px;

  &:hover {
    background: #3d76e9;
  }
`;

export const Formulario = () => {
  const initialForm = {
    nombre: '',
    correo: '',
  };

  const [formValues, setFormValues] = useState(initialForm);
  const { nombre, correo } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    db.collection('usuarios')
      .add({ ...formValues })
      .then(() => {
        console.log('Se agrego correctamente');
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  const reset = () => {
    setFormValues(initialForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        name="nombre"
        value={nombre}
        onChange={handleInputChange}
        placeholder="Nombre"
        autoComplete="off"
      />
      <Input
        type="email"
        name="correo"
        value={correo}
        onChange={handleInputChange}
        placeholder="Correo"
        autoComplete="off"
      />
      <Boton type="submit">Agregar</Boton>
    </form>
  );
};
