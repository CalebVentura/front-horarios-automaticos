import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="curso" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'CI062 - Mecanica de solidos'},
    { label: 'EE467'},
    { label: 'EE530'},
    { label: 'EE590'},
    { label: 'BEG06'},
    { label: 'EE498'},
]