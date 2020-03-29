import { Component } from 'preact';
export default class CardTable extends Component {

    state = { 
        items: [],
        itemStack:[],
        stats: {count: 0, points: 0 }
       }

    componentDidUpdate( ) {
       // console.log("ComponentDidUpdate triggers hide at 3 secconds")
       //setTimeout( this.hideLast2, 3000);
    }

    componentDidMount( ) {
        //build the card collection
        let { items, itemStack } = this.state;
        let counter = 0;
        const suits = [ "Spade", "Heart","Diamond", "Club" ];
        const bgColors = [ "color0","color1","color2","color3" ];
        const positions = [ "Ace","King","Queen","Jack","10","9","8","7","6","5","4","3","2" ];
        //let items = [];
        for (var i=0; i<= 3; i++){
            for (var j=0; j<=12; j++) {
                let item = {id: counter};
                counter++;
                item.suit = suits[i];
                item.position = positions[j];
                //flipped true means that you can see it
                //flipped false means that you can't see it
                item.flipped = false;
                item.matched = false;
                if ( item.flipped == false ){
                    item.class = "cardBack " + bgColors[i] + " card";  
                }
                else {
                    item.class = bgColors[i] + " card";   
                }
                items.push(item);  
            }
        }
        //shuffle the array and reassign the ids for access purposes to match the new array order
        items = this.shuffle(items);
        for ( i = 0; i < items.length; i++ ) {
            items[i].id = i;
        }
        this.setState({items, itemStack});
    }

    shuffle = items => {
        var currentIndex = items.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = items[currentIndex];
            items[currentIndex] = items[randomIndex];
            items[randomIndex] = temporaryValue;
        }
        return items;
    }

    getLastPosition = ( itemStack ) => {
        var lastPosition
        if (itemStack.length == 0) {
            lastPosition = { id:"", position: "", class: "none", matched: false }
        }
        else {
            lastPosition = itemStack[itemStack.length -1];
        }
        return lastPosition;
    }

    matchTest = ( id, items, lastPosition ) => {

       //// let lastClass = lastPosition.class;
        //flipped true means that you can see it
        //flipped false means that you can't see it

        let alreadyMatched = items[id].matched || lastPosition.matched;
        if (items[id].position == lastPosition.position && id != lastPosition.id && !alreadyMatched) {
            return true
        }
        else {
            return false
        }
    }

    hasMatch = str  => {
        if ( str.indexOf('match') > -1 ) {
            return true
        } else {
            return false
        }
    }

    flip = id => {
        let { items, itemStack, stats } = this.state;
       // const id = this.getElemId(e);
        //ignore this click if its on an already matched item. Invalid.
        if (items[id].matched==true){
            return
        }
        //ignore this click if its on a card that's already face up. Invalid
        if ( items[id].flipped==true){
            return
        }
        stats.count++;
        //if two cards are displayed already hide them
        if( itemStack.length > 1 ){
            this.hideLast2()
        }
        //flip the state
        items[id].flipped=!items[id].flipped;

        //check if a match occurred against a currently unmatched card
        let lastPosition = this.getLastPosition(itemStack);
        if ( this.matchTest(id, items, lastPosition ) ){
            //update the state
            items[id].matched = true;
            items[lastPosition.id].matched = true;
            //update the class, seems unnecessary, or should be isolated
            items[id].class = this.removeCardBack(items[id].class);
            items[id].class = this.addMatch(items[id].class);
            items[lastPosition.id].class = this.addMatch(items[lastPosition.id].class);
            stats.points = stats.points + 2;
        } else {
            if (items[id].flipped==true) {
                items[id].class = this.removeCardBack(items[id].class);
            } 
            else {
                items[id].class = this.addCardBack(items[id].class);
            }
        }
        itemStack.push( items[id] );
        this.setState({items, itemStack, stats});
    }

    addCardBack = ( str ) => {
        str = str.replace(/cardBack /g,'');
        str = "cardBack " + str;
        return str
    }

    removeCardBack = ( str ) => {
        str = str.replace(/cardBack /g,'');
        return str
    } 

    addMatch = ( str ) => {
        str = str.replace(/ match/g,'');
        str = str + " match";
        return str
    }

    removeMatch = ( str ) => {
        str = str.replace(/ match/g,'');
        return str
    }

    hideLast2 = ( ) => {
        let { items, itemStack } = this.state;
        if (itemStack.length > 1 ) {
            let last = itemStack.pop();
            let b4that = itemStack.pop();
            let lid = last.id;
            let lid2 = b4that.id;
            //rule: only hide unmatched cards
            if (last.class.indexOf('match') < 0 ) {
                items[last.id].class = this.addCardBack( items[last.id].class );
                items[last.id].flipped = false;
                items[b4that.id].class = this.addCardBack( items[b4that.id].class);
                items[b4that.id].flipped = false; 
            }
            this.setState({items, itemStack});
        }
    }

    //not used, re used for reset
    newGame = () => {
        let { items, itemStack } = this.state;
        items.map( item => {
            item.flipped = false;
            item.matched = false;
            item.class = this.removeMatch(item.class);
            item.class = this.addCardBack(item.class);
        })
        itemStack = [];
        items = this.shuffle(items);
        for (var i = 0; i < items.length; i++ ) {
            items[i].id = i;
        }
        this.setState({items, itemStack});
    }
    
    render({ }, { items, itemStack, stats }) {
        return (
            <div class="cardTable">
                <button style="margin-left: 10px; margin-top:5px;" value="left" onClick={this.newGame}>New Game</button> 
                <div class="inlineBlock stats"> &nbsp; Flips: {stats.count} Points: {stats.points} Move: {itemStack.length} </div>
                <div class="container">
                    { items.map( (item, idx) => ( 
                        <div class="inlineBlock cardWrap raised">
                            <div class={item.class} id={idx} onClick={() => this.flip(idx)}> 
                                {item.position}
                                <div class="suit">{item.suit}</div>
                            </div>
                        </div>
                    )) } 
                 </div> 
            </div>
        )
    }
}