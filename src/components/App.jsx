import React, { useState } from "react";
import Nav from "./Nav";

import hogs from "../porkers_data";

function App() {
	const [selectHog, setHog] = useState(null)
	const [selectGreasedHog, setGreasedHog] = useState(false)
	const [sortHog, setSortHog] = useState("")
	const [hiddenHogs, setHiddenHogs] = useState([])
	const [newName, setNewName] = useState("")
	const [newWeight, setNewWeight] = useState("")
	const [newSpecialty, setNewSpecialty] = useState("")
	const [newGreased, setNewGreased] = useState(false)
	const [allHogs, setAllHogs] = useState(hogs)
	function handleClick(hog) {
		setHog(hog)
	}
	function handleAddHog() {
		const newHog = {
			name: newName,
			weight: Number(newWeight),
			specialty: newSpecialty,
			greased: newGreased,
			"highest medal achieved": "wood",
			image: "https://raw.githubusercontent.com/learn-co-curriculum/react-hooks-hogwild/master/public/images/babe.jpg",
		}
		setAllHogs([...allHogs, newHog])
		setNewName("")
		setNewWeight("")
		setNewSpecialty("")
		setNewGreased(false)
	}
	const hogsToShow = selectGreasedHog
		? allHogs.filter((hog) => hog.greased === true)
		: allHogs;

	const sortedHogs = [...hogsToShow].sort((a, b) => {
		if (sortHog === "name") {
			return a.name.localeCompare(b.name);
		}
		if (sortHog === "weight") {
			return a.weight - b.weight;
		}
		return 0;
		});

	const visibleHogs = sortedHogs.filter((hog) => !hiddenHogs.includes(hog.name));
	return (
		<div className="App">
			<Nav />
			<div style={{ position: "relative", zIndex: 1, marginBottom: "1rem" }}>
			<label htmlFor="greased">Greased Pigs Only?</label>
			<input type="checkbox" id="greased" onChange={(event) => setGreasedHog(event.target.checked)}></input>
			<label htmlFor="sort">Sort by:</label>
			<select id="sort" onChange={(event) => setSortHog(event.target.value)}>
				<option value="name">Name</option>
				<option value="weight">Weight</option>
			</select>
			<form style={{ marginTop: "0.5rem" }}>
				<label htmlFor="name">Name:</label>
				<input 
					id="name" 
					type="text"
					value={newName}
					onChange={(event) => setNewName(event.target.value)} />
				<label htmlFor="weight">Weight:</label>
				<input 
					id="weight"
					type="number"
					value={newWeight}
					onChange={(event) => setNewWeight(event.target.value)} />
				<label htmlFor="specialty">Specialty:</label>
				<input
					id="specialty"
					type="text"
					value={newSpecialty}
					onChange={(event) => setNewSpecialty(event.target.value)}
				/>
				<label htmlFor="new-hog-greased">Greased?</label>
				<input
					type="checkbox"
					id="new-hog-greased"
					checked={newGreased}
					onChange={(event) => setNewGreased(event.target.checked)}
				/>
				<button type="button" onClick={handleAddHog}>Add Hog</button>
			</form>
			</div>
			<div className="ui grid container" style={{ clear: "both" }}>
			{visibleHogs.map((hog) => {
				return (
					<div key={hog.name} className="ui eight wide column">
						<div aria-label="hog card" className="ui card">
							<img src={hog.image} alt={`Photo of ${hog.name}`} />
							<h3 onClick={() => handleClick(hog)}>
								{hog.name}
							</h3>
							<button onClick={() => setHiddenHogs([...hiddenHogs, hog.name])}>Hide Me</button>
							{selectHog && selectHog.name === hog.name && (
								<>
									<p>Specialty: {hog.specialty}</p>
									<p>{hog.greased ? "Greased" : "Nongreased"}</p>
									<p>{hog["highest medal achieved"]}</p>
									<p>{hog.weight}</p>
								</>
							)}
						</div>
					</div>
				)
			})}
			</div>
		</div>
	);
}

export default App;
