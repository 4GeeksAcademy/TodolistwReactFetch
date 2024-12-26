import { useState, useEffect } from "react";
import React from "react";

const [todos, setTodos]= useState(["pasear","bailar","comprar"]);
const [valores, setValores]= useState();

const crearUsuario = async ()=>{
    const response = await fetch("https://playground.4geeks.com/todo/users/UsuarioDesconocido", { method: "POST" });
    console.log(response);
    
}

const cargaDatos= async ()=>{
    const response = await fetch("https://playground.4geeks.com/todo/users/UsuarioDesconocido",{ method: "GET" })	
    console.log(response);
        if (!response.ok) {
             crearUsuario();
            return cargaDatos;}
         else{
            const data = await response.json()
            
            setTodos(data.todos.map((t) => t.label));// ver aqui lo del label
            console.log(todos);


        }
    }




useEffect (() => { cargaDatos() }, []);


const Home = () => {


    return (
        <div className="text-center">
            <h1>Listado</h1>
         <div className="card">
            <ul>
            <li>
                {todos.map(t)}
                </li>
            </ul>

         </div>
        </div>
    );
};

export default Home;
