import React, {useEffect, useState} from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let quoteAPI = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("Life is not the number breaths you take, it's the number of moments that take your breath away.")
  const [author, setAuthor] = useState("Someone from a movie")
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [colorAccent, setColorAccent] = useState(null)

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteAPI)
  }, [quoteAPI])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(COLORS_ARRAY.length * Math.random())
    setRandomNumber(randomInteger)
    setColorAccent(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }





  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: colorAccent}}>
        <div id="quote-box" style={{color: colorAccent}}>
        <p id="text">
          {quote}
        </p>
        <p id="author">- {author}</p>
        <div className="button">
        <a id="tweet-quote" style={{backgroundColor: colorAccent}} 
        href={encodeURI(`http://twitter.com/intent/tweet?text=${quote} -${author}`)} target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
          </a>
        
        <button id="new-quote" style={{backgroundColor: colorAccent}} 
        onClick={()=>getRandomQuote()}>
          Next Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
