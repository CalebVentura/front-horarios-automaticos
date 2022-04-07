import Button from '@mui/material/Button';

import Select from './components/select';
import Table from './components/table'
import Autocomplete from './components/autocomplete'
import Checkbox from './components/checkbox'

function App() {
    return (
        <div className="App">
            <div className="px-5">
                <div className='titulo text-center my-5'>
                    <h1>Generador de horarios COMSOC - FIEE</h1>
                </div>

                <div className='select-curso'>
                    <div className='row mt-3'>
                        <div className='col-7'>
                            <Autocomplete />
                        </div>
                        <div className='col-5'>
                            <Checkbox />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-7'>
                            <Autocomplete />
                        </div>
                        <div className='col-5'>
                            <Checkbox />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-7'>
                            <Autocomplete />
                        </div>
                        <div className='col-5'>
                            <Checkbox />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-7'>
                            <Autocomplete />
                        </div>
                        <div className='col-5'>
                            <Checkbox />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-7'>
                            <Autocomplete />
                        </div>
                        <div className='col-5'>
                            <Checkbox />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-7'>
                            <Autocomplete />
                        </div>
                        <div className='col-5'>
                            <Checkbox />
                        </div>
                    </div>
                </div>

                <div className='text-center mt-3'>
                    {/* <button className="btn btn-primary mt-3"> Generar</button> */}
                    <Button variant="contained">GENERAR HORARIOS</Button>

                </div>

                <hr className='my-5' />

                <div className='horarios mb-5'>
                    <div className="mt-5">
                        <p><b>Horario 1</b></p>
                        <Table />
                    </div>
                    <div className="mt-5">
                        <p><b>Horario 2</b></p>
                        <Table />
                    </div>
                    <div className="mt-5">
                        <p><b>Horario 3</b></p>
                        <Table />
                    </div>
                    <div className="mt-5">
                        <p><b>Horario 4</b></p>
                        <Table />
                    </div>
                    <div className="mt-5">
                        <p><b>Horario 5</b></p>
                        <Table />
                    </div>
                    <div className="mt-5">
                        <p><b>Horario 6</b></p>
                        <Table />
                    </div>
                    <div className="mt-5">
                        <p><b>Horario 7</b></p>
                        <Table />
                    </div>
                    <div className="mt-5">
                        <p><b>Horario 8</b></p>
                        <Table />
                    </div>
                    <div className="mt-5">
                        <p><b>Horario 9</b></p>
                        <Table />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
