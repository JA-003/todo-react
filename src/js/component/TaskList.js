import React, { useState, useEffect } from "react";

let baseURL = "https://assets.breatheco.de/apis/fake/todos/user/";
// let username = "JA0035";

export function TaskList() {
	const [task, setTask] = useState("");
	const [taskListArray, setTaskListArray] = useState([]);
	const [error, setError] = useState(false);
	const [username, setUsername] = useState("");

	const fetchAPIPost = async () => {
		try {
			let response = await fetch(baseURL + username, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: "[]"
			});
			let body = await response.json();
			if (response.ok) {
				console.log("new user created");
				fetchAPIGet();
			} else {
				console.log("something went wrong");
				console.log(response.status);
				console.log(body);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchAPIGet = async () => {
		try {
			let response = await fetch(baseURL + username, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});
			let body = await response.json();
			if (response.ok) {
				console.log(response.status);
				console.log(body);
				setTaskListArray(body);
			} else {
				console.log(response.status);
				console.log(body);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchAPIPut = async updatedArrayOfTask => {
		try {
			let response = await fetch(baseURL + username, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(updatedArrayOfTask)
			});
			if (response.ok) {
				console.log("success PUTTING");
				await fetchAPIGet();
			} else {
				console.log("failed PUT");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchAPIDelete = async () => {
		try {
			let response = await fetch(baseURL + username, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});
			let body = await response.json();
			if (response.ok) {
				console.log("succesfully deleted tasklist");
			} else {
				console.log("something is wrong");
				console.log(body);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// fetchAPIGet();
		// fetchAPIPost();
		// fetchAPIDelete();
	}, []);

	const addUser = event => {
		if (event.target.value === "") {
			console.log("userempty");
			return;
		}
		if (event.key == "Enter") {
			setUsername(event.target.value);
			console.log(username);
		}
	};

	const addTask = event => {
		if (task === "") {
			setError(true);
			return;
		}
		if (event.key == "Enter") {
			// let milliseconds = Date().toString();
			let newArray = [...taskListArray, { label: task, done: false }];
			fetchAPIPut(newArray);
			setTask("");
			setError(false);
		}
	};

	const deleteTask = id => {
		const newTaskListArray = taskListArray.filter((task, index) => {
			return index != id;
		});
		console.log(Date.now());
		setTaskListArray(newTaskListArray);
	};

	const clear = () => {
		setTask("");
		setError(false);
	};

	return (
		<div className="container p-3 mt-5 bg-primary text-black rounded">
			<h1 className="display-1 text-center text-white">todos</h1>
			{username.length == 0 ? (
				<input
					type="text"
					className="form-control mb-3"
					placeholder="Write your user name"
					onKeyUp={event => {
						addUser(event);
					}}
				/>
			) : (
				<div className="alert alert-info d-flex justify-content-between">
					<div>
						You are looking at <strong>{username}</strong> user
						Tasks List
					</div>
					<span
						className="btn btn-dark"
						onClick={() => {
							setUsername("");
						}}>
						Change
					</span>
				</div>
			)}
			{username.length != 0 && (
				<>
					<div className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Please write a new task and press ENTER"
							onBlur={() => setError(false)}
							onChange={event => {
								setTask(event.target.value);
								setError(false);
							}}
							value={task}
							onKeyUp={addTask}
						/>
						<div className="btn btn-light  ml-1" onClick={clear}>
							Clear
						</div>
					</div>
					{error && (
						<div className="alert alert-danger" role="alert">
							The task can not be empty!!!
						</div>
					)}

					<ul className="list-group">
						{taskListArray.map((task, index) => {
							return (
								<li
									className="list-group-item d-flex justify-content-between"
									key={index}>
									<div className="innertask-container">
										<div>{task.label}</div>
										<div className="done-status">
											{task.done
												? "Completed ✔"
												: "Pending 🚩"}
										</div>
									</div>
									<div
										className="btn erase-task"
										title="Delete task"
										onClick={() => {
											deleteTask(index);
										}}>
										&times;
									</div>
								</li>
							);
						})}
					</ul>
					<div className="task-counter mt-2">
						{taskListArray.length === 0
							? '"Il Dolce Far Niente 😎⛱"'
							: `${taskListArray.length} Items left`}
					</div>
				</>
			)}
		</div>
	);
}
