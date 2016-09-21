/* jshint esversion: 6 */
/* global $ */

'use strict'

$(document).ready(function main () {
  /* --- Display information modal box --- */
  $('.what').click(function () {
    $('.overlay').fadeIn(1000)
  })

  /* --- Hide information modal box --- */
  $('a.close').click(function () {
    $('.overlay').fadeOut(1000)
  })

  /* --- Setup new game --- */
  let ans = getRandomInt()
  let numGuesses = 0 // Variable to keep track of the number of guesses
  let userPreviousGuess = 0
  let makeHtmlObj = (obj, field) => { obj[field] = $(field).html(); return obj }
  let fields = ['#feedback', '#userGuess', '#count', '#guessList']
  let origHtml = fields.reduce(makeHtmlObj, {})
  let guessList = []
  console.log(origHtml) // Delete later

  $('a.new').click(function doNewGame (event) {
    event.preventDefault()
    fields.map(resetObj)
    ans = getRandomInt()
    numGuesses = 0
    userPreviousGuess = 0
    toggleGuessButton('enable')
    guessList = []
  })

  function resetObj (field) {
    $(field).html(origHtml[field])
  }

  /* --- Handle button submit --- */
  $('#myForm').submit(function handelSubmit (event) {
    event.preventDefault()
    let userGuess = parseInt(
      $('#userGuess').val()
    )
    $('#myForm')[0].reset() /* !!! why do I need [0]? !!! */
    evalGuess(userGuess)
  })

  /* --- Generate Random value for the user --- */
  function getRandomInt () {
  //  return 51 // For testing only (comment out later)
    let randRet = Math.floor(100 * Math.random())
    console.log('Random number = ' + randRet)
    return randRet
  }

  /* --- Update the number of guesses --- */
  function incGuessNum (numGuesses) {
    numGuesses++ // Increment the number of guesses the user has made
    $('#count').text(numGuesses) // id='count'
    return numGuesses
  }

  /* --- Respond to the users guess submission --- */
  function evalGuess (userGuess) {
    if (validInput(userGuess) === false) {
      updateFeedback('INVALID INPUT!')
      return NaN // By breaking out of the function here we stop things from being updated and go back to the main event loop
    }
    if (guessList.includes(userGuess)) { // Check if the guess has already been made
      updateFeedback('You Already Guessed That!')
      return NaN
    } else {
      guessList.push(userGuess)
    }
    numGuesses = incGuessNum(numGuesses) // Change func name. Maybe break it out so that it has methods update and increment.
    if (userGuess === ans) {
      userWins()
    } else if (numGuesses === 1) {
      userPreviousGuess = updateResponseHighOrLow(ans, userGuess)
    } else {
      userPreviousGuess = updateResponseHotOrCold(ans, userGuess, userPreviousGuess)
    }
    $('.guessBox').append('<div class="guesses">' + userGuess + '</div>')
  }

  /* --- Tell the user if they are to high or low --- */
  function updateResponseHighOrLow (ans, userGuess) {
    if (userGuess < ans) {
      updateFeedback('Guess to Low')
    } else {
      updateFeedback('Guess to High')
    }
    let userPreviousGuess = userGuess
    return userPreviousGuess
  }

  /* --- Tell the user if they are hotter or colder --- */
  function updateResponseHotOrCold (ans, userGuess, userPreviousGuess) {
    if (Math.abs((ans - userPreviousGuess)) <= Math.abs((ans - userGuess))) {
      updateFeedback('Colder')
    } else {
      updateFeedback('Warmer')
    }
    userPreviousGuess = userGuess
    return userPreviousGuess
  }

  /* --- Update the feedback ID --- */
  function updateFeedback (feedbackString) {
    $('#feedback').text(feedbackString)
  }

  /* --- Check if the users guess is valid --- */
  function validInput (userGuess) {
    if (Number.isInteger(userGuess)) return true
    else return false
  }

  /* --- Change to user wins state --- */
  function userWins () {
    updateFeedback('YOU WIN!')
    toggleGuessButton('disable')
  }

  /* --- enable/disable the form submit button --- */
  function toggleGuessButton (toggle) {
    if (toggle === 'enable') {
      $('#guessButton').prop('disabled', false)
    } else {
      $('#guessButton').prop('disabled', true)
    }
  }
})
