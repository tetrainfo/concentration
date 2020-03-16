import { Component } from 'preact';
export default class Steps extends Component {

    state = { }
    
    render({ }, { }) {
        return (
            <div style="border:1px solid black; padding:5px;">
                <pre>
					<code>
				Preact concentration example<br></br>

				C:\Users\tetra\Preact\n<br></br>
				Preact CLI<br></br>
Example:<br></br>
preact create template-name app-name<br></br>
templates are: Default, Simple, Material, Netlify CS<br></br>
app-name: concentration ...should be shorter. Got a WARN!<br></br>
therefore: <br></br>
====DO THIS====<br></br>
Navigate to parent directory in terminal<br></br>
>preact create Simple concentration<br></br>
>cd concentration<br></br>
>npm start  .... server will start on localhost:PORT ... look at console for PORT<br></br>
open browser and look for Hello World<br></br>
open src/index.js<br></br>
replace 'Hello World' with 'Concentration'. Ctrl-S to save and watch your browser. Auto updates.<br></br>
next, copy the basic class component pattern into a new file<br></br>
rename it<br></br>
import it into index.js<br></br>
					</code>
				</pre>
            </div>
        )
        }
}