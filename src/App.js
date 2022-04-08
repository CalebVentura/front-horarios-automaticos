// import Select from './components/select';
import Table from './components/table'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const _ = require('lodash')
const cursosHorario = require('./files/horarioCursosFinal.json')

function App() {

    const [posiblesCursosSeccionx, setPosibleCursoSeccion] = useState([])

    const [horariosGeneralesTotalesx, setHorariosGeneralesTotalesx] = useState([])

    const [cursosCodigo, setCursosCodigo] = useState([])

    const [cantidadCursos, setCantidadCursos] = useState([1])

    // cursos que el usuario puede o quiere llevar
    const seccionesGenerale = ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
    const posiblesCursosSeccion = [
        {
            CODIGO: 'EE712',
            SECCIONES: ['M'],
        },
        {
            CODIGO: 'EE446',
            SECCIONES: ['R', 'S', 'T'],
        },
        {
            CODIGO: 'CIB28',
            SECCIONES: ['M'],
        }
    ]

    const generarCursosCodigo = () => {
        let cursosCodigox = cursosHorario.map((hor => { return { label: hor.CODIGO + ' - ' + hor.CURSO } }))
        let hash = {}
        cursosCodigox = cursosCodigox.filter(o => hash[o.label] ? false : hash[o.label] = true)
        setCursosCodigo(cursosCodigox)
    }

    // Funcion para agrupar cursos por CODIGO
    const cantidadDeCursosDistintos = (arrayCursos) => {
        const cursosAgrupados = _.chain(arrayCursos)
            .groupBy("CODIGO")
            .map((value, key) => (key)).value()
        return cursosAgrupados.length
    }

    // Funcion para obtener las secciones distintas de un solo curso
    const obtenerSeccionesDistintas = (arrayCursos) => {
        const cursosAgrupados = _.chain(arrayCursos)
            .groupBy("SECCION")
            .map((value, key) => (key)).value()
        return cursosAgrupados
    }

    // Arreglo de todos los cursos-seccion que coinciden con lo ingresado por el usuario
    let cursos = []
    for (const codigo of posiblesCursosSeccion) {
        cursos.push(cursosHorario.filter((curso) => (curso.CODIGO === codigo.CODIGO) && (codigo.SECCIONES.includes(curso.SECCION))))
    }

    let horariosGeneralesTotales = []

    const generarHorarios = () => {

        for (const secc1 of posiblesCursosSeccion[0].SECCIONES) {
            // Arbol de horarios
            let horariosTotales = [[]]

            // El arbol empieza con curso 0 seccion M
            for (const curso of cursos[0]) {
                if (curso.SECCION === secc1) horariosTotales[0].push(curso)
            }

            // bucle por cursos
            for (let i = 1; i < cursos.length; i++) {

                const seccionesDelCurso = obtenerSeccionesDistintas(cursos[i])

                // bucle por secciones de cada curso
                for (const sec of seccionesDelCurso) {
                    // Obtener un array de horarios con el curso y sección especificada
                    // cursos[i] contiene los horarios del curso específico con todas las secciones
                    const cursoSecc = cursos[i].filter(cur => cur.SECCION === sec)

                    if (typeof cursoSecc[0] !== 'undefined') {

                        // Buscar intersecciones
                        // El curso i se coompara con los arreglos dentro de horarioTotales donde la cantida dde cursos sea i

                        // Obtenemos los arreglos de horarioTotales de donde la cantidad de cursos sea i
                        const horariosDeLongitudi = horariosTotales.filter(hor => {
                            const cursosDistintos = cantidadDeCursosDistintos(hor)
                            return cursosDistintos === i
                        })

                        // recorremos cada arreglo donde la cantidad de cursos sea i
                        for (const horarioDeLongitudi of horariosDeLongitudi) {
                            // variable que me indicará la cantidad de cruces
                            let interseccion = [0]

                            //  Buscando cruuces.El curso-dia-hora que añadiré no se cruza con otros ya existentes en el arreglo de cantidad de cursos i
                            cursoSecc.forEach(horarioCursoSecc => {
                                horarioDeLongitudi.forEach(objHorarioDeLongitudi => {
                                    const inter = objHorarioDeLongitudi.DIAHORA.filter(b => horarioCursoSecc.DIAHORA.includes(b))
                                    interseccion.push(inter.length)
                                })
                            })

                            const suma = interseccion.reduce((summa, elem) => summa + elem)
                            if (suma === 0) horariosTotales.push([...cursoSecc, ...horarioDeLongitudi])
                        }
                    }
                }
            }

            const longitudUltimoArray = horariosTotales[horariosTotales.length - 1].length

            const textoMostrar = []
            horariosTotales.forEach(hor => {
                let curseccc = hor.map(cur => {
                    return { CODIGO: cur.CODIGO, SECCION: cur.SECCION }
                })
                let hash = {}
                curseccc = curseccc.filter(o => hash[o.CODIGO] ? false : hash[o.CODIGO] = true)

                if (curseccc.length === posiblesCursosSeccion.length) {
                    textoMostrar.push(curseccc)
                }

                if (hor.length === longitudUltimoArray) {
                    horariosGeneralesTotales.push(hor)
                }

            })
            // console.log(`Cantidad de horarios con ${posiblesCursosSeccion[0].CODIGO} - ${secc1} : ${textoMostrar.length}`)
            // console.log(textoMostrar)

        }

        // console.log(`Cantidad de horarios totales: ${horariosGeneralesTotales.length}`)
        setHorariosGeneralesTotalesx(horariosGeneralesTotales);

    }

    useEffect(() => {
        generarCursosCodigo()
    }, [])

    return (
        <div className="App">
            <div className="px-5">
                <div className='titulo text-center my-5'>
                    <h1>Generador de horarios COMSOC - FIEE</h1>
                </div>

                <div className='select-curso'>
                    <h4> Selecciona tus cursos-seccion</h4>

                    <div className='row mt-3'>
                        <div className='col-7'>
                            {/* <Autocomplete /> */}
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={cursosCodigo}
                                renderInput={(params) => <TextField {...params} label="curso" />}
                            />
                        </div>
                        <div className='col-5'>
                            {seccionesGenerale.map((sec) => {
                                return (
                                    <div className="form-check form-check-inline me-4" key={sec}>
                                        <input className="form-check-input" key={"in-" + sec} type="checkbox" id={"inlineCheckbox-" + sec} value={sec} />
                                        <label className="form-check-label" key={"lb-" + sec} htmlFor={"inlineCheckbox-" + sec}>{sec}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <h6> Cursos Seleccionados</h6>
                    {/* {cursosSeleccionados.map(curso => {
                        return(
                            <div>
                                <p>{curso.CODIGO} - {curso.SECCION}</p>
                            </div>
                        )
                    })} */}
                    <button className="btn btn-success mt-3" onClick={() => setCantidadCursos([...cantidadCursos, 1])}> + Añadir curso</button>
                </div>

                {/* <p>{horariosGeneralesTotalesx.length}</p> */}

                <div className='text-center mt-3'>
                    <button className="btn btn-primary mt-3" onClick={() => { generarHorarios() }}> GENERAR HORARIOS</button>
                    {/* <Button variant="contained">GENERAR HORARIOS</Button> */}
                </div>

                <hr className='my-5' />

                <div className='horarios mb-5'>
                    {horariosGeneralesTotalesx.map(horario => {
                        return (
                            <div className="mt-5" key={'horario' + horariosGeneralesTotalesx.indexOf(horario) + 1}>
                                <p><b>Horario {horariosGeneralesTotalesx.indexOf(horario) + 1}</b></p>
                                <Table horario={horario} />
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    );
}

export default App;
