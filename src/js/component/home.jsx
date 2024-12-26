import { useState, useEffect } from "react";
import React from "react";
// let nuevoTodo = "tarea de ejemplo";



const Home = () => {
	const [nuevoTodo, setNuevoTodo] = useState("")
	const [todos, setTodos] = useState([""]);
	const [id, setId] = useState([""]);
	const [usuario, setUsuario] = useState("UsuarioDesconicido");

	const handleClick = () => {
		setTodos([...todos, nuevoTodo]);


	}

	const altaUsuario = () => {

		setUsuario(prompt("Ingrese nombre de usuario sin espacios"))
		alert("Usuario creado Correctamente");
		crearUsuario();
		console.log(usuario);

	}




	const crearUsuario = async () => {

		const response = await fetch(`https://playground.4geeks.com/todo/users/${usuario}`, { method: "POST" });
		cargaDatos()
		console.log(response);

	}

	const cargaDatos = async () => {
		const response = await fetch(`https://playground.4geeks.com/todo/users/${usuario}`, { method: "GET" })
		console.log(response);
		if (!response.ok) {
			crearUsuario();
			return cargaDatos();
		}
		else {
			const data = await response.json()
			
				setTodos(data.todos.map((t) => t.label));
				setId(data.todos.map((t) => t.id));
				console.log(todos);
				console.log(id);
			



		}
	}

	const agregarTarea = async () => {
		console.log(nuevoTodo);

		if (nuevoTodo === "") {
			alert(" no hay tarea para agregar, por favor añada una tarea")
		}
		else {
			handleClick()
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			const raw = JSON.stringify({
				"label": nuevoTodo,
				"in-line": "false"
			})
			const requestOPtions = {
				method: "POST",
				headers: myHeaders,
				body: raw,

			};
			await fetch(`https://playground.4geeks.com/todo/todos/${usuario}`, requestOPtions)
				.then((response) => response.text())
				.then((result) => {
					console.log(result)
					cargaDatos()
					setNuevoTodo("");


				})
		}
	}

	const handleChange = (e) => {
		if (usuario !== "") {
			setNuevoTodo(e.target.value);
		}
		else {
			altaUsuario();
		}

	}
	const borrarTodos = async (indice) => {

		const todoFiltrado = todos.filter((todo, i) => i !== indice);
		setTodos(todoFiltrado);

		await fetch(`https://playground.4geeks.com/todo/todos/${indice}`, { method: "DELETE" })
			.then((response) => response.text())
			.then((result) => {
				console.log(result)
			})
		cargaDatos()
		setNuevoTodo("")
	}
	const borrarUsuario = async () => {
		await fetch(`https://playground.4geeks.com/todo/users/${usuario}`, { method: "DELETE" })
			.then((response) => response.text())
			.then((result) => {
				alert("Usuario eliminado correctamente");
				setUsuario("");
				cargaDatos()
				console.log(result)
			})
	}

	useEffect(() => { cargaDatos() }, []);

	return (
		<div className="text-center">
			<h1>Listado de {usuario}</h1>
			<div className="card">
				<div>
					<input type="text" value={nuevoTodo} onChange={handleChange} />
					<button className="btn btn-primary mx-3" id="add" onClick={agregarTarea} >Agregar Tarea</button>
					<button className="btn btn-danger " id="dele" onClick={borrarUsuario}>Borrar usuario</button>

				</div>

				<ul>

					{todos.map((todo, indice) => {
						return (
							<li className="mb-2 bg-light" key={indice}>
								{todo} <button className="btn btn-warning" onClick={() => borrarTodos(id[indice])}>Borrar Tarea</button>
							</li>
						)
					})}

				</ul>

			</div>
		</div>
	);
};

export default Home;
