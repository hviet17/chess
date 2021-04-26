import './App.scss';
import classNames from 'classnames';
import {useEffect} from "react";
require('stockfish/src/stockfish.js');

// eslint-disable-next-line no-undef
const stockfish = typeof STOCKFISH == 'function' ? STOCKFISH() : new Worker('./stockfish.js');

const rows = 8;
const columns = 8;

function App() {
    useEffect(() => {
        stockfish.onmessage = function (event) {
            //NOTE: Web Workers wrap the response in an object.
            console.log(event.data ? event.data : event);
        };
    });
    return (
        <div className="App">
            <h1>Chess Viet</h1>
            <div id="board">
                {Board()}
            </div>
        </div>
    );
}

function Rows(rowIndex) {
    const items = [];
    const cb = (j) => !(rowIndex % 2) ? j % 2 : !(j % 2);
    items.push(<div className="square" key={`num${rowIndex}`}>{columns - rowIndex}</div>)
    for (let i = 0; i < columns; i++) {
        items.push(<div className={classNames({square: true, dark: cb(i), light: !cb(i)})} key={`square${rowIndex}${i}`}/>);
    }
    return items;
}

function Board() {
    const items = [];
    for (let i = 0; i < rows; i++) {
        items.push(<div className="row" key={`row${i}`}>{Rows(i)}</div>);
    }
    const alphabets = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    items.push(
        <div className="row" key="alphabet">
            {alphabets.map((item, index) => <div className="square" key={`alphabet${index}`}>{item}</div>)}
        </div>
    );
    return items;
}

export default App;
