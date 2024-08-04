import React from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload'
import CaptureImage from './components/CaptureImage'
import ShowSuggestion from './components/ShowSuggestion'
import { useState } from 'react';

function App() {
  const [inputType, setInputType] = useState();
  const [suggestionsData, setSuggestionsData] = useState({});
  return (
    <div className="App">
      <header className="App-header">Carbon Sense</header>
      <div className='Content'>
        <div className='InputSection'>
          <div className='InputOptionContainer'>
            <h2>Select an Image</h2>
            <h4>to Calculate Carbon Footprint</h4>
            <div className="inputOptions">
              <input type='radio' name="inputMode" id="imageUpload" value="imageUpload" onChange={(event)=>{setSuggestionsData({});setInputType(event.target.value)}}></input>
              <label htmlFor="imageUpload">Upload Image</label><br></br>
              <input type='radio' name="inputMode" id="captureImage" value="captureImage" onChange={(event)=>{setSuggestionsData({});setInputType(event.target.value)}}></input>
              <label htmlFor="captureImage">Capture Live Image</label><br></br>
            </div>
          </div>
          <div className='InputCaptureContainer'>
            {inputType === 'imageUpload' && <ImageUpload setSuggestionsData={setSuggestionsData} /> }
            {inputType === 'captureImage' && <CaptureImage setSuggestionsData={setSuggestionsData} />}
          </div>
        </div>
        {suggestionsData && Object.keys(suggestionsData).length > 0 &&<ShowSuggestion suggestionsData={suggestionsData} ></ShowSuggestion>}
      </div>
    </div>
  );
}

export default App;
