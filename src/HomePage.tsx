import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Grid } from "@material-ui/core";
import { TextField, Typography, Button } from "@mui/material";

interface Props {
    appState: {
      currentPage: string;
      UserName: string;
      isLoggedIn: boolean;
      setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
      setUserName: React.Dispatch<React.SetStateAction<string>>;
      setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    };
  }

export default function HomePage(props: Props) {
    const { appState } = props;
    const { currentPage, UserName, isLoggedIn, setCurrentPage, setUserName, setIsLoggedIn } = appState;

    interface Product {
      id: string;
      name: string;
      unitPrice: number;
      totalPrice: number;
    }
    const [productName, setProductName] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [userProducts, setUserProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    React.useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("data") || "[]");
      const currentUser = storedData.find(
        (userData: any) => userData.login === UserName
      );

      if (currentUser && currentUser.products) {
        setUserProducts(currentUser.products);
      }
    }, []);

    const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const id = uuidv4();
      const product: Product = {
        id: id,
        name: String(productName),
        unitPrice: Number(unitPrice),
        totalPrice: Number(totalPrice),
      };
      const storedData = JSON.parse(localStorage.getItem("data") || "[]");
      const currentUser = storedData.find(
        (userData: any) => userData.login === UserName
      );

      if (currentUser) {
        const updatedProducts = [...userProducts, product];
        currentUser.products = updatedProducts;
        setUserProducts(updatedProducts);
        localStorage.setItem("data", JSON.stringify(storedData));
      }
      setProductName("");
      setUnitPrice("");
      setTotalPrice("");
    };

    const handleEditProduct = (product: Product) => {
      const updatedName = prompt("Enter new product name:", product.name);
      const updatedUnitPrice = prompt(
        "Enter new unit price:",
        String(product.unitPrice)
      );
      const updatedTotalPrice = prompt(
        "Enter new total price:",
        String(product.totalPrice)
      );
      const storedData = JSON.parse(localStorage.getItem("data") || "[]");
      const currentUser = storedData.find(
        (userData: any) => userData.login === UserName
      );

      if (currentUser) {
        const updatedProducts = userProducts.map((p) => {
          if (p.id === product.id) {
            return {
              ...p,
              name: updatedName || p.name,
              unitPrice: Number(updatedUnitPrice) || p.unitPrice,
              totalPrice: Number(updatedTotalPrice) || p.totalPrice,
            };
          } else {
            return p;
          }
        });
        currentUser.products = updatedProducts;
        setUserProducts(updatedProducts);
        localStorage.setItem("data", JSON.stringify(storedData));
      }
    };

    const handleDeleteProduct = (product: Product) => {
      const storedData = JSON.parse(localStorage.getItem("data") || "[]");
      const currentUser = storedData.find(
        (userData: any) => userData.login === UserName
      );

      if (currentUser) {
        const updatedProducts = userProducts.filter((p) => p.id !== product.id);
        currentUser.products = updatedProducts;
        setUserProducts(updatedProducts);
        localStorage.setItem("data", JSON.stringify(storedData));
      }
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const filteredProducts = userProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserProducts(filteredProducts);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentPage("login");
      };
    return (
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <nav>
            <div className="nav">
              <Typography sx={{ml:2, mt:2}} variant="h4" fontWeight="bold">Welcome, {UserName}</Typography>
              <Button sx={{ml:2, mt:1}} variant="contained" onClick={handleLogout}>Logout</Button>
            </div>
          </nav>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="products">
            <Typography sx={{mb:2}} variant="h4">Products List</Typography>
            <div className="forms">
              <form onSubmit={handleAddProduct}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Name Of Product"
                      variant="outlined"
                      type="text"
                      value={productName}
                      onChange={(event) => setProductName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Unit Price"
                      variant="outlined"
                      type="number"
                      value={unitPrice}
                      onChange={(event) => setUnitPrice(event.target.value)}
                    />

                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Total Price"
                      variant="outlined"
                      type="number"
                      value={totalPrice}
                      onChange={(event) => setTotalPrice(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className="login-buttons">
                      <Button variant="contained" type="submit">Add Product</Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
              <ul className="prod-list">
                {userProducts.slice().reverse().map((product) => (
                  <li key={product.id}>
                    <Typography sx={{ display: 'block' }} variant="button">Name: {product.name}</Typography>
                    <Typography sx={{ display: 'block' }} variant="button">Unit Price: {product.unitPrice}</Typography>
                    <Typography sx={{ display: 'block' }} variant="button">Total Price: {product.totalPrice}</Typography>
                    <Button sx={{ mr: 2 }} variant="contained" onClick={() => handleEditProduct(product)}>Edit</Button>
                    <Button variant="contained" onClick={() => handleDeleteProduct(product)}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
              <form onSubmit={handleSearch}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                  <TextField
                      label="Search Product"
                      variant="outlined"
                      type="text"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <div className="login-buttons">
                      <Button sx={{mt:2}} variant="contained" type="submit">Search</Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }