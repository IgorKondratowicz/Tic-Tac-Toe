import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
	const [currentSymbol, setCurrentSymbol] = useState('O');
	const [answers, setAnswers] = useState([null, null, null, null, null, null,null, null, null])
	const [gameWon, setGameWon] = useState(false);
	const [wasGameEnded, setWasGameEnded] = useState(false);
	const [refresh, setRefresh] = useState(false);


	const handleClick = (event) =>{
		if(!gameWon){
			if(!event.target.innerHTML){
				setWasGameEnded(false)
				setAnswers(() => answers.map((elem, index) =>{
					if(index === parseInt(event.target.id)){
						return currentSymbol
					}
					return elem
				})
				)

				event.target.innerText = currentSymbol;

			}
		}

	}

	const createTiles = () => {
		let createdTiles = []
		for(let i = 0; i<9; i++){
			createdTiles.push(<div className='tile' id={i} key = {i} onClick={(e) => handleClick(e)}></div>)
		}
		return createdTiles
	}


	const isGameWon = (tile1, tile2, tile3) =>{
		if((tile1 || tile2 || tile3) && (tile1 === tile2 && tile2 === tile3) ) {
			setRefresh(true)
			return true;
		}
		return false
	}

	const resetGame = () =>{
		setAnswers([null, null, null, null, null, null,null, null, null]);
		[...document.getElementsByClassName('tile')].forEach(item =>{
			item.innerText = '';
		})
		setGameWon(false);
		setCurrentSymbol('O')
		setWasGameEnded(true)
		setRefresh(false)
		document.getElementsByClassName('result')[0].innerText = ''
	}



	useEffect(()=>{
		if(!gameWon){
			if(isGameWon(answers[0], answers[1], answers[2])) setGameWon(true)
			else if(isGameWon(answers[3], answers[4], answers[5])) setGameWon(true)
			else if(isGameWon(answers[6], answers[7], answers[8])) setGameWon(true)
			else if(isGameWon(answers[0], answers[3], answers[6])) setGameWon(true)
			else if(isGameWon(answers[1], answers[4], answers[7])) setGameWon(true)
			else if(isGameWon(answers[2], answers[5], answers[8])) setGameWon(true)
			else if(isGameWon(answers[0], answers[4], answers[8])) setGameWon(true)
			else if(isGameWon(answers[2], answers[4], answers[6])) setGameWon(true)
			else {
				if(!wasGameEnded) setCurrentSymbol(prevState => prevState === 'O' ? 'X' : 'O');
			}
			if(!answers.includes(null)){
				document.getElementsByClassName('result')[0].innerText = 'No one has won';
				setRefresh(true);
			}


		}

	},[answers, wasGameEnded])



	return (
	<>
		<main>
			<header className='game_title'>
				<p>Tic Tac Toe</p>
			</header>
			<div className="main_section">

				<div className='tales_container'>
				{
					createTiles()
				}
				</div>

			</div>
			<div className="output">
				<p className='result'>
					{
						gameWon ? `Game won by ${currentSymbol}` : ''
					}
				</p>
			</div>

		</main>

		<div className="refresh_icon">
			<img src="refresh.png" style={{ display: !refresh ? 'none' : 'block', cursor: 'pointer' }} alt="refreshIcon" onClick={() => resetGame()} />
		</div>

	</>
	);
	}

export default App;
