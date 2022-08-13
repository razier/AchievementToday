import './App.css';
import { useState, useEffect } from 'react';

function App() {
	const [selecteddate, setSelecteddate] = useState(new Date().toISOString().split("T")[0]);
	const [Achievement, setAchievement] = useState("");

	const updateAchievement = (event) => {
		setAchievement(event.target.value);
	}

	useEffect(()=>{
		if(localStorage.getItem(selecteddate)){
			setAchievement(localStorage.getItem(selecteddate));
		}
	},[]);

	useEffect(()=>{
		if(localStorage.getItem(selecteddate)){
			setAchievement(localStorage.getItem(selecteddate));
		}
	},[selecteddate]);

	useEffect(()=>{
		if(Achievement!==""){
			localStorage.setItem(selecteddate, Achievement.trim());
		}
	},[Achievement]);

	return (
		<div className="App bg-gray-100 h-screen">
			<div className="container mx-auto md:py-10 sm:p-0 h-full">

				<div className="bg-white shadow overflow-hidden sm:rounded-lg flex flex-col h-full">
					<div className="px-4 py-5 sm:px-6 flex-none">
						<h3 className="text-lg leading-6 font-medium text-gray-900">Achievement {selecteddate===new Date().toISOString().split("T")[0] ? 'Today' : {selecteddate} }</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">Reaffirmation that you did well</p>
					</div>

					<div className="border-t border-gray-200 flex-auto h-full">
						<textarea autoFocus className="px-4 py-5 sm:px-6 w-full h-full focus:outline-none caret-orange-400 text-gray-500 text-lg md:text-base resize-none" spellCheck="false" value={Achievement} onChange={updateAchievement} ></textarea>
					</div>

					<div className="px-4 py-5 bg-gray-50 text-right sm:px-6 flex-none">
						<small className="text-gray-400">Changes are automatically saved on your browser</small>
					</div>

				</div>



			</div>
		</div>
	);
}

export default App;