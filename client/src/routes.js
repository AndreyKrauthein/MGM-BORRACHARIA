import React from "react"

import {BrowserRouter, Switch, Route} from "react-router-dom"

//IMPORTS ADMIN
import Dashboard from "./pages/admin/dashboard"
import Produtos from "./pages/admin/produtos"
import ProdutosCadastrar from "./pages/admin/produtos/produtos.cadastrar"
import ProdutosEditar from "./pages/admin/produtos/produtos.editar"

import Usuarios from "./pages/admin/usuarios"

//IMPORTS CLIENT
import Home from "./pages/client/home"
import ProdutoDetails from "./pages/client/produtos/produtos.details"
import Login from "./pages/client/usuarios/login"
import Register from "./pages/client/usuarios/register"


export default function Routes(){

    return (
        <BrowserRouter>
            <Switch>
                {/* ROTA CLIENTE */}
                <Route path="/" exact component={Home}/>
                <Route path="/produtos/:idProduto" exact component={ProdutoDetails}/>

                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>

                {/* ROTA ADMIN */}
                <Route path="/admin" exact component={Dashboard}/>

                <Route path="/admin/produtos" exact component={Produtos}/>
                <Route path="/admin/produtos/cadastrar" exact component={ProdutosCadastrar}/>
                <Route path="/admin/produtos/Editar/:idProduto" exact component={ProdutosEditar}/>

                <Route path="/admin/usuarios" exact component={Usuarios}/>
            </Switch>
        </BrowserRouter>
    )
}

