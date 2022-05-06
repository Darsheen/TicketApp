
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import AddProductModal from './AddProductModal';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function* NaturalNum() {
    let i = 0;
    while (i < Infinity) {
        yield "p" + i;
        i++
    }
}
let generator = NaturalNum();

export default function CreateTicket() {
    const [ticket, setTicket] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [openAddProductModal, setOpenAddProductModal] = useState(false);

    let tableHeaders = [
        "product",
        "type",
        "quantity",
        "unitPrice",
        "action"
    ]

    useEffect(() => {
        // axios.get('http://localhost:3000/ticket')
        //     .then(response => {
        //         if (response.data !== null && response.data !== "" && response.data !== undefined)
        //             setTicket(response.data)
        //     })
        //     .catch(error => {
        //         setErrorMsg(error);
        //         setShowErrorMsg(true);
        //     })      

        getTicketDetails()
            .then((response) => {
                console.log(response);
                let tempTicket = response.map(product => ({ sno: generator.next().value, ...product }))
                setTicket(tempTicket)
            })
            .catch((error) => {
                setErrorMsg(error);
                setShowErrorMsg(true);
            })
    }, []);

    const getTicketDetails = () => {
        return new Promise((resolve, reject) => {
            resolve([{ product: 'water', type: 'drinks', quantity: 10, unitPrice: 1 },
            { product: 'chicken wings', type: 'food', quantity: 3, unitPrice: 5 },
            { product: 'steak', type: 'food', quantity: 1, unitPrice: 9 },
            { product: 'coffee', type: 'drinks', quantity: 4, unitPrice: 2 },
            { product: 'wine bottle', type: 'drinks', quantity: 1, unitPrice: 7 }])
        })
    }

    const handleUpdateQuantity = (event, index) => {
        const regex = /^[0-9\b]+$/;
        if (event.target.value === '' || regex.test(event.target.value)) {
            let tempTicket = [...ticket];
            let tempObj = tempTicket[index]
            tempTicket[index] = { ...tempObj, quantity: event.target.value }
            setTicket([...tempTicket])
        }

    }

    const handleRemoveProduct = (rowIndex, rowName) => {

        let tableRow = document.getElementById(rowName);
        tableRow.className = "hidden"
        tableRow.addEventListener('transitionend', () => {
            let tempTicket = [...ticket];
            tempTicket.splice(rowIndex, 1);
            setTicket([...tempTicket]);
        });
    }

    const getTicketTotalAmnt = () => {
        let total = 0;
        ticket?.forEach(product => { total += parseInt(product.unitPrice) * parseInt(product.quantity) });
        return total;
    }

    const handleClose = (product) => {
        
        if (product !== null) {
            let tempTicket = [...ticket];
            tempTicket.push({ sno: generator.next().value, ...product });
            setTicket([...tempTicket]);
        }
        setOpenAddProductModal(false);
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={showErrorMsg}
                autoHideDuration={3000}
                onClose={() => setShowErrorMsg(false)}
            >
                <SnackbarContent
                    style={{
                        backgroundColor: "#EA0029",
                        color: "#ffffff",
                        fontSize: "16px",
                    }}
                    message={<span>Error : {errorMsg}</span>}
                />
            </Snackbar>
            <AddProductModal open={openAddProductModal} handleClose={handleClose} />
            <Grid container justifyContent="center" style={{ marginTop: "100px" }}>
                <Grid item xs={12} sm={8} md={8} >
                    <table>
                        <thead>
                            <tr>
                                {
                                    tableHeaders?.map((header, index) =>
                                        <th key={index}>
                                            {header}
                                        </th>)
                                }
                            </tr>
                        </thead>
                        <tbody>

                            {ticket?.map((product, rowIndex) => {
                                return (
                                    <tr id={product.sno} key={product.sno}>
                                        {
                                            tableHeaders?.map((header, colIndex) => {
                                                return (
                                                    <td key={colIndex}>
                                                        {header !== "action" ?
                                                            header == "quantity" ?
                                                                <input
                                                                    className='controls'
                                                                    value={product[header]}
                                                                    onChange={(e) => handleUpdateQuantity(e, rowIndex)} />
                                                                : <span>{product[header]}</span>
                                                            : <IconButton
                                                                size="medium"
                                                                sx={{ color: '#05141f' }}
                                                                onClick={() => handleRemoveProduct(rowIndex, product.sno)}>
                                                                <DeleteIcon fontSize="inherit" />
                                                            </IconButton>}
                                                    </td>)
                                            })
                                        }
                                    </tr>
                                )
                            })}

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4">Total</td>
                                <td >{getTicketTotalAmnt()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{ marginTop: "30px" }}>
                <Grid item xs={12} sm={8} md={8} textAlign="center" >
                    <Button
                        variant="contained"
                        className='btnStyle'
                        onClick={() => setOpenAddProductModal(true)}>
                        Add Product
                    </Button>
                </Grid>
            </Grid>

        </div>
    )
}
