import React, { useCallback, useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database';
import { db, signFirebase } from '../../utils/Firebase'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IMeasures } from '../../measures.interface';
import './measures.css'

export const Mesures = () => {
  const [measures, setMeasures] = useState<IMeasures[]>([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [lastInfo, setLastInfo] = useState<IMeasures>({
    I:'0',
    p:'0',
    C:'0'
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getMesures = useCallback(() => {
    const data = ref(db, '/Mesures');
    onValue(data, (snapshot) => {
      const data = snapshot.val();
      setMeasures(Object.values(data));
      const last: IMeasures[] = Object.values(data)
      last.length > 0 && setLastInfo(last[last.length-1]);
    })
  }, []);

  useEffect(() => {

    signFirebase().then(res => {
      if(res! !== '') return setError(res!);
      else setError(null);
      getMesures();

    });
  }, [getMesures])

  const columns = [
    { id: 'current', label: 'Corriente (A)', minWidth: 100},
    { id: 'power', label: 'Potencia (kW)', minWidth: 100},
    { id: 'consumption', label: 'Consumo (kW-h)', minWidth: 100},
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1e1e1e',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
      color: theme.palette.common.white,
    },
  }));

  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  return (
    error
    ? <h1>{error}</h1>
    : <ThemeProvider theme={darkTheme}>
      <p className='last_info'>
        {
          lastInfo
          && `Ultimo dato recibido: ${lastInfo.I} A, ${lastInfo.p} kW, ${lastInfo.C} kW-h`
        }
      </p>
      <Paper variant="outlined" sx={{ width: '95%', overflow: 'hidden', borderRadius: 2, mx: "auto" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align='center'
                    style={{ minWidth: column.minWidth, fontSize: 20, fontWeight: 'bold' }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {measures
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <StyledTableCell  align='center'>
                        {row.I + '  A'}
                      </StyledTableCell >
                      <StyledTableCell  align='center'>
                        {row.p + '  kW'}
                      </StyledTableCell >
                      <StyledTableCell  align='center'>
                        {row.C + '  kW-h'}
                      </StyledTableCell >
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5,10, 25, 100]}
          component="div"
          count={measures.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
  )
}
