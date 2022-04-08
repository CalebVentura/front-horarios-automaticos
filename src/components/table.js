import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react'


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('8:00', 'BMA20-N', 159, 6.0, 24, 4.0, 'ij'),
  createData('9:00', 'BMA20-N', 159, 6.0, 24, 4.0),
  createData('10:00', 'BMA20-N', 305, 3.7, 67, 4.3),
  createData('11:00', 'DEL67', 9.0, 37, 4.3, ''),
  createData('12:00', 'BEG06-M', 237, 9.0, 37, 4.3),
  createData('13:00', 'BEG06-M', 262, 16.0, 24, 6.0),
  createData('14:00', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('15:00', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('16:00', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('17:00', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('18:00', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('19:00', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('20:00', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('21:00', 'Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {

  const [textoMostrar, setTextoMostrar] = useState([])

  const getTextoMostrar = (horario) => {
    let curseccc = horario.map(cur => {
      return { CODIGO: cur.CODIGO, SECCION: cur.SECCION }
    })
    let hash = {}
    curseccc = curseccc.filter(o => hash[o.CODIGO] ? false : hash[o.CODIGO] = true)

    setTextoMostrar(JSON.stringify(curseccc))
  }

  // console.log(textoMostrar.toString())
  // console.log(textoMostrar)

  useEffect(() => {
    getTextoMostrar(props.horario)
  }, [])

  return (
    <div>
      <p>{textoMostrar}</p>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hora</TableCell>
              <TableCell align="center">Martes</TableCell>
              <TableCell align="center">Miércoles</TableCell>
              <TableCell align="center">Jueves</TableCell>
              <TableCell align="center">Viernes</TableCell>
              <TableCell align="center">Sábado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
}