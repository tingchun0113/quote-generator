const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

function showLoadingSpinner () {
  loader.hidden = false
  quoteContainer.hidden = true
}

function removeLoadingSpinner () {
  if (!loader.hidden) {
    quoteContainer.hidden = false
    loader.hidden = true
  }
}

// Get Quote From API
async function getQuote () {
  showLoadingSpinner()
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  const proxyUrl = 'https://afternoon-stream-80829.herokuapp.com/'
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
  try {
    const res = await fetch(proxyUrl + apiUrl)
    const data = await res.json()
    if (data.quoteAuthor === '') {
      authorText.textContent = 'Unknown'
    } else {
      authorText.textContent = data.quoteAuthor
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = data.quoteText
    removeLoadingSpinner()
  } catch (err) {
    getQuote()
  }
}

// Tweet Quote
function tweetQuote () {
  const quote = quoteText.textContent
  const author = authorText.textContent
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuote()
