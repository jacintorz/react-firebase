import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import { Contacto } from './Contacto';

const ContenedorContactos = styled.div`
  margin-top: 40px;
`;

export const ListaContactos = () => {
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    db.collection('usuarios').onSnapshot((snapshot) => {
      setContactos(
        snapshot.docs.map((documento) => {
          return { ...documento.data(), id: documento.id };
        })
      );
    });
  }, []);

  return (
    contactos.length > 0 && (
      <ContenedorContactos>
        {contactos.map((contacto) => (
          <Contacto
            key={contacto.id}
            id={contacto.id}
            nombre={contacto.nombre}
            correo={contacto.correo}
          />
        ))}
      </ContenedorContactos>
    )
  );
};
