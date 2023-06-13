import { v4 as uuidv4 } from 'uuid';

const generarId = () => {
  const idUnico = uuidv4();
  return idUnico;
};

export {
    generarId
}