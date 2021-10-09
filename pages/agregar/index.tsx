import type {NextPage} from 'next'
import React, {useState, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import url from '../../common/baseapi';
import {Button, Card, CardActions, CardContent, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useFormik} from 'formik';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import LoopIcon from '@mui/icons-material/Loop';
import {useRouter} from "next/router";
import {data} from "browserslist";
import List from "../../componet/list";
import addTodo from "../../componet/addTodo";
import AddTodo from "../../componet/addTodo";
import {color} from "@mui/system";
import { createTheme } from '@mui/material/styles';
import { purple,lime,pink } from '@mui/material/colors';



const Agregar: NextPage = () => {

    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        id: 0,
        email: '',
        username: '',
        password: '',
    });
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

    };

    const formik = useFormik({
        initialValues: user,
        onSubmit: (values,action) => {
            console.log(values)
            if (values.id === 0) {
                saveUser(values)

                console.log("yo estoy agregando")
            } else {
                updateUser(values)
                console.log("yo me estoy actualizando")

            }

            action.resetForm({
                values: {
                    // the type of `values` inferred to be Blog
                    id: 0,
                    email: '',
                    username: '',
                    password: '',
                },
                // you can also set the other form states here
            })

                 },


    });


    const saveUser = (data: any) => {
        const datoenviar = {
            email: data.email,
            username: data.username,
            password: data.password,

        }
        url.post('system/users', datoenviar).then(response => {
         resetData()
        }).catch(error => {
            console.error(error);
        })

        getUser()
        handleClose()


    };

    const getUser = () => {
        url.get('system/users').then(response => {
            const date = response.data
            setUsers(date.data)

            console.log(date.data)
        }).catch(error => {
            console.error(error);
        })
    };
    // const getUser = async () => {
    //     const data = await url.get( 'system/users').then((response => response));
    //     const usuarios = data.data.data || [];
    //     setUsers(usuarios)
    //       console.log(usuarios)
    //
    // }
//     const obtener = async () => {
//         const data = await url.get('system/users/').then((response => response));
//         const grupo1 = data.data;
//         setUsers(grupo1)
// console.log(grupo1)
//
//     }

    const deleteUser = (data: any) => {
        url.delete('system/users/' + data)
            .then(response => {
                // @ts-ignore
                setUsers(prevState => {
                    const grupPrev = [...prevState]
                    // @ts-ignore
                    const next1 = grupPrev.findIndex((copy) => copy.id === data)
                    if (next1 > -1) {
                        grupPrev.splice(next1, 1)
                    }
                    return grupPrev;
                })
                //  setUsers(users.filter(user=> user.id !== id))
                console.log(data);

            })
            .catch(e => {
                console.log(e);
            });

    };

    // const removeGrupo = (data:any, index) => {
    //     url.delete( 'system/users/' + data.id).then((reponse) => {
    //         console.log(reponse.data)
    //         setUsers(prevState => {
    //             const grupPrev = [...prevState]
    //             const next1 = grupPrev.findIndex((copy) => copy.id === data.id)
    //             if (next1 > -1) {
    //                 grupPrev.splice(next1, 1)
    //             }
    //             return grupPrev;
    //         })
    //
    //     })
    // }

    const updateUser = (data: any) => {
        url.patch('system/users/' + data.id, data).then((reponse) => {
            console.log(reponse.data)
            setUsers(prevState => {
                const copyPrev = [...prevState]
                // @ts-ignore
                const index = copyPrev.findIndex((edit) => edit.id === data.id)
                if (index > -1) {
                    // @ts-ignore
                    copyPrev.splice(index, 1, reponse.data)
                }

                return copyPrev;
            })
resetData()
        })
        handleClose()

    }
    //
    const editar = (data: any) => {
        setUser(data);
        formik.setFieldValue('id',data.id)
        formik.setFieldValue("username",data.username)
        formik.setFieldValue("email",data.email)
        formik.setFieldValue("password",data.password)


        handleClickOpen()
    }

    // const actualizarUser = (data:any) => {
    //     url.patch('system/users/' + data.id, data)
    //         .then(response => {
    //             console.log(response.data);
    //
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };

    const resetData = () => {
        setUser({
            id: 0,
            email: '',
            username: '',
            password: '',
        })
    }

    useEffect(() => {
        getUser(),
       formik.resetForm();
    }, [])


    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Agregar
            </Button>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title">

                    {user.id === 0 ? "Agregar usuarios" : "Editando usuarios"}
                </DialogTitle>
                <DialogContent dividers>
                    {JSON.stringify(user)}
                    <div className="form-group">
                        <label htmlFor="title">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            value={formik.values.username}
                            name="username"
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="title">email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            required
                            value={formik.values.email}
                            name="email"
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="title">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            required
                            value={formik.values.password}
                            name="password"
                            onChange={formik.handleChange}
                        />
                    </div>

                </DialogContent>
                <Button variant="contained" color="primary" onClick={() => formik.handleSubmit()}>
                    {user.id === 0 ? "agregar" : "editar"}
                </Button>
            </Dialog>


            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">User-Name</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((info, i) => (
                            <TableRow
                                // @ts-ignore
                                key={info.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >

                                <TableCell component="th" scope="row">

                                    {info.id}
                                </TableCell>
                                <TableCell align="right">{info.username}</TableCell>
                                <TableCell align="right">{info.password}</TableCell>
                                <TableCell align="right">{info.email}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => deleteUser(info.id) } aria-label="delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => editar(info)}>
                                        <LoopIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Card  >
                <CardContent sx={{ color: lime[500],background:purple[500]}}>
            <List/>
                </CardContent>
            <CardActions sx={{ color: lime[500],background:pink[500]}}>

            <AddTodo/>
            </CardActions>
            </Card>
        </div>
    )
}

export default Agregar
