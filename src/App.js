import './App.css';
import { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import { AiOutlineFileText, AiOutlineQrcode } from "react-icons/ai";

function App() {
	const date = new Date();
	const dateFormatter = Intl.DateTimeFormat('sv-SE');

	const [dates, setDates] = useState([]);
	const [selecteddate, setSelecteddate] = useState(dateFormatter.format(date));
	const [achievement, setAchievement] = useState("");
	const [showqr, setShowqr] = useState(false);
	const [message, setMessage] = useState("");

	const updateAchievement = (event) => {
		setAchievement(event.target.value);
	}

	const dateIsValid = (dateVal) => {
		if(!isNaN(new Date(dateVal))){
			return true;
		}else{
			return false;
		}
	}

	useEffect(()=>{
		let params = new URLSearchParams(window.location.search);		
		if(params.get('data')){
			setAchievement(window.atob(params.get('data')));
		}else if(localStorage.getItem(selecteddate)){
			setAchievement(localStorage.getItem(selecteddate));
		}

		var dateList = {...localStorage};
		var dateKeys = Object.keys(dateList);
		dateKeys.push(dateFormatter.format(date));
		dateKeys = dateKeys.filter(dateIsValid);
		dateKeys.reverse();
		setDates([...new Set(dateKeys)]);
	},[]);

	useEffect(()=>{
		if(localStorage.getItem(selecteddate)){
			setAchievement(localStorage.getItem(selecteddate));
		}
	},[selecteddate]);

	const copyToClipboard = (event) => {
		navigator.clipboard.writeText(event.target.value);
		var oldMessage = message;
		setTimeout(()=>{
			setMessage(oldMessage)
		}, 2000);
		setMessage("Url has been copied to clipboard!")
	}

	return (
		<div className="App bg-gray-100 h-screen">
			<div className="container mx-auto md:py-10 sm:p-0 h-full">
				<div className="bg-white shadow overflow-hidden sm:rounded-lg flex flex-col h-full">
					<div className="px-4 py-5 sm:px-6 flex-none">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Achievement&nbsp;
							<select className="m-0 p-0" onChange={(e)=>{setAchievement("");setSelecteddate(e.target.value)}}>
								{dates.map((dateVal)=>{return <option value={dateVal} key={dateVal}>{dateVal===dateFormatter.format(date)?'Today':dateVal+''}</option>})}
							</select>
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">Reaffirmation that you did well</p>
					</div>

					<div className="border-t border-gray-200 flex-auto h-full">
						<div className="flex h-full">
							<div className="flex-auto h-full" id="section-input">
								{showqr ? 
									<div className="px-4 py-5 sm:px-6 text-center">
										{achievement.length>0 ?
											<div>
												<QRCode className="mx-auto mb-5" size={300} value={window.location.origin+'/?data='+window.btoa(achievement)} />
												<input className="text-gray-400 w-full text-center" value={window.location.origin+'/?data='+window.btoa(achievement)} onClick={copyToClipboard} readOnly />
											</div>
										:
											<div>
												<QRCode className="mx-auto mb-5" size={300} value={window.location.origin} />
												<input className="text-gray-400 w-full text-center" value={window.location.origin} onClick={copyToClipboard} readOnly />
											</div>
										}
									</div>
									:
									<textarea autoFocus className="px-4 py-5 sm:px-6 w-full h-full focus:outline-none caret-orange-400 text-gray-500 text-lg md:text-base resize-none" spellCheck="false" value={achievement} onChange={updateAchievement} ></textarea>
								}
							</div>
						</div>
					</div>

					<div className="px-4 py-5 bg-gray-50 text-right sm:px-6 flex-none">
						<div className="flex">
							<button onClick={()=>{localStorage.setItem(selecteddate, achievement.trim());setMessage("Changes has been saved");setTimeout(()=>{setMessage("")}, 2000);}} class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-3 rounded">Save</button>
							<span className="flex-auto text-left text-gray-400 py-1 px-3">{message}</span>
							<button className='flex-none' onClick={()=>{ setShowqr(!showqr) }} title={!showqr ? 'Show Transfer QR' : 'Show Achievement'} >{!showqr ? <AiOutlineQrcode /> : <AiOutlineFileText /> }</button>
						</div>
					</div>

				</div>

			</div>
		</div>
	);
}

export default App;