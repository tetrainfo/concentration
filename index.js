import './style';
import CardTable from './cardTable';
import Steps from './steps';
import { Component } from 'preact';

export default class App extends Component {

	state = { 
		display: 'hidden',
		displayNot: 'block'
	}

	close = e => {
		let { display, displayNot } = this.state;	
		display = 'hidden';
		displayNot = 'block';
		this.setState( {display, displayNot });
	}

	open = e => {
		let { display, displayNot } = this.state;	
		display = 'block';
		displayNot = 'hidden';
		this.setState( { display, displayNot });
	}

	render( {}, { display, displayNot } ) {
		return (
			<div>
				<h1>Concentration</h1>

				<div class="smaller">Click on one card, then another. Matched cards turn green. Next click will hide unmatched cards.</div>
				<CardTable/>

				<h2>Steps <button class={displayNot} onClick={ this.open }>Open</button><button class={display} onClick={ this.close }>Close</button></h2>
				<div class={display} >
					<Steps/>
				</div>
			</div>
		);
	}
}
