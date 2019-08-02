import React, { Component } from 'react'
import $ from 'jquery'
// import WordAnim from 'react-random-word';
// import logo from './logo.svg';
// import './assets/js/scripts'
import modal from './assets/js/modal'

import './assets/css/App.css'

var randomWord = require('random-words')

export default class Main extends Component
{
  constructor(props)
  {
    super(props)
    
    this.cnt = 1
    this.type = ''
    this.diff = 0
    this.gens = ''
    this.totalWordsPerMinute = 500
    this.elm = ''

    if(localStorage.getItem('Difficulty') == null)
    {
      this.diff = [3, 4]
      localStorage.setItem('Difficulty', this.diff)
    }
    else
      this.diff = localStorage.getItem('Difficulty').split(',')
    
    this.cacheGens = localStorage.getItem('Generated Words')
    this.gens = randomWord({ exactly: this.totalWordsPerMinute, min: this.diff[0], max: this.diff[1], maxLength: this.diff[1], join: ' ' })

    this.state = {
      generator: this.gens
    }

    this.wordRenderer = this.wordRenderer.bind(this)
  }

  componentDidMount()
  {
    $('#typing-box input').keypress(function()
    {
      setTimeout(function()
      {
        this.type = $('#typing-box input').val()
      }, 70)
    })
  }
  
  wordRenderer = () =>
  {
    this.gens = randomWord({ exactly: this.totalWordsPerMinute, min: 1, max: this.diff, maxLength: this.diff, join: ' ' })
    this.setState({ generator: this.gens })
  }
  

  render() {
    $(document).ready(function()
    {
      $('#typing-box input').keypress(function(event)
      {
        setTimeout(function()
        {
          this.type = $('#typing-box input').val()
          if(event.which === 32 || event.keyCode === 32)
            if(this.type !== '')
              this.cnt++
        }, 70)

        if($('.to-type p').length < 14)
        {
          if(event.which === 32 || event.keyCode === 32)
            this.gens = randomWord({ exactly: this.totalWordsPerMinute, min: 1, max: this.diff, maxLength: this.diff, join: ' ' })
        }
      })
    })

    return (
      <div className="container">
        <div className="options-modal">
          <div className="options-innerds">
            <div className="options-title">
              <h2>Settings</h2>
              <span className="close" onClick={ modal.closeModal }>&times;</span>
            </div>
            <div className="options-content">
              <div className="timer-options">
                <h3>Timer:</h3>
                <button id="timer-15" onClick={ modal.timer15sec }>15</button>&nbsp;
                <button id="timer-30" onClick={ modal.timer30sec }>30</button>&nbsp;
                <button id="timer-60" onClick={ modal.timer60sec }>60</button>&nbsp;
                <button id="timer-120" onClick={ modal.timer2min }>120</button>&nbsp;
                {/* <button id="timer-custom" onClick={ this.timerCustom }>Custom</button> */}
              </div>
              <div className="difficulty-options">
                <h3>Difficulty:</h3>
                <button id="diff-easy" onClick={ modal.diffEasy }>Easy</button>&nbsp;
                <button id="diff-medium" onClick={ modal.diffMedium }>Medium</button>&nbsp;
                <button id="diff-hard" onClick={ modal.diffHard }>Hard</button>&nbsp;
                <button id="diff-expert" onClick={ modal.diffExpert }>Expert</button>&nbsp;
                {/* <button id="timer-custom" onClick={ this.timerCustom }>Custom</button> */}
              </div>
            </div>
          </div>
        </div>

        <header className="header">
          <div className="whole-bag-of-jellybean">
            <div className="top-container">
              <div className="title">
                Typist
              </div>
              <div className="timer-container">
                <div className="timer">
                  <p id="1"></p>
                  <p id="2"></p>
                  <p id="3"></p>
                </div>
              </div>
            </div>
            <div className="typing-container">
              <div className="to-type">
                {/* <WordAnim
                  word={ rando }
                  speed={75}
                  rounds={5}
                  letters="0123456789~!@#$%^&*()_+ &nbsp;"
                /> */}
                <span>{ this.state.generator }</span>
              </div>
            </div>
            <div id="typing-box">
              <input type="text"/>
              {/* <input type="text" disabled placeholder="Still under maintenance, stay updated!" style={{textAlign:'center',textTransform:'uppercase'}}/> */}
              <button id="redo" onClick={ this.wordRenderer }>↻</button>
            </div>
            <div className="bottom-row-container">
              <div className="options" onClick={ modal.openModal }>
                <img src="assets/img/settings.svg" width="25px" alt=""/>
              </div>
              <div className="wpm-container">Gross WPM: <span id="gross-wpm"></span> | WPM: <span id="net-wpm"></span></div>
            </div>
          </div>
          {/* <div className="hidden-elements"></div> */}
        </header>
        <div className="footer">
          Made by <a href="http://github.com/fralyx" target="_blank" rel="noopener noreferrer">fralyx</a> with ❤ in <a href="http://reactjs.org" target="_blank" rel="noopener noreferrer">React.JS</a>
        </div>
      </div>
    );
  }
}