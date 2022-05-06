import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";

var style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '450px',
    bgcolor: '#FFFFFF',
    border: '0px',
    boxShadow: 0,
    p: 4,
    borderRadius: '0px',
    outline: 'none',
    padding: '0px'
};

export default function AddProductModal({ open, handleClose }) {

    let productInitialState = {
        product: "",
        type: "",
        quantity: "1",
        unitPrice: ""
    }
    const [product, setProduct] = useState(productInitialState);
    const [errorMsg, setErrorMsg] = useState();

    const handleInputControlChange = (event) => {
        if (event.target.id == "price" || event.target.id == "quantity") {
            const regex = /^[0-9\b]+$/;
            if (event.target.value === '' || regex.test(event.target.value)) {
                setProduct({
                    ...product,
                    [event.target.id]: event.target.value
                })
            }
        } else
            setProduct({
                ...product,
                [event.target.id]: event.target.value
            })
    }

    const handleAddProduct = () => {
        for (let key in product) {
            if (product[key] == "") {
                setErrorMsg("Please enter all fields");
                return;
            } else {
                setErrorMsg("");
            }
        }
        setProduct(productInitialState);
        handleClose(product);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => { handleClose(null); setProduct(productInitialState) }}
            >
                <Box sx={style}>
                    <div className='modalHeader'>
                        Add Product
                    </div>
                    <div className='padding40'>
                        <Grid container
                            rowSpacing={2}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}

                        >
                            <Grid item xs={12} sm={12} md={12} >
                                <TextField

                                    id="product"
                                    label="Product Name *"
                                    defaultValue=""
                                    value={product.product}
                                    onChange={handleInputControlChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                                <TextField

                                    id="type"
                                    label="Product Type *"
                                    defaultValue=""
                                    value={product.type}
                                    onChange={handleInputControlChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                                <TextField

                                    id="quantity"
                                    label="Product Quantity *"
                                    defaultValue=""
                                    value={product.quantity}
                                    onChange={handleInputControlChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                                <TextField

                                    id="unitPrice"
                                    label="Product Price *"                                    
                                    value={product.unitPrice}
                                    onChange={handleInputControlChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                                <span style={{ color: 'red' }}>{errorMsg}</span>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                                <Button
                                    style={{ marginRight: '20px' }}
                                    variant="contained"
                                    className='btnStyle'
                                    onClick={handleAddProduct}>
                                    Add
                                </Button>
                                <Button
                                    variant="contained"
                                    className='btnStyle'
                                    onClick={() => {handleClose(null);setProduct(productInitialState);}}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}
