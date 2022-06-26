import "./App.css";
import React, { useState } from "react";

function App() {
  const API_URL = "https://coherecampingcreator.herokuapp.com";

  const [data, setData] = useState(null);
  const [category, setCategory] = useState("activities");
  const [saveToText, setSaveToText] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("default message");

  // Handles changing of categories between activities, questions, and stories.
  const handleCategory = (whichCategory) => {
    setCategory(whichCategory);
    setSaveToText(false); //Sets saveToText to false, if it was true, so that setMessage can be called again. Otherwise, twilio will send previous generation.
  };

  // When handleSubmit is called, fetches API call from /api/category and then gets assigns response to data
  const handleSubmit = (categ) => {
    setData(null);
    setSaveToText(false);
    fetch(`${API_URL}/api/${categ}`)
      .then((res) => res.json())
      .then((data) => setData(`${data.generations[0].text.slice(0, -1)}`));
  };

  // Async to fetch long api call for the scary story
  async function fetchStory() {
    setData(null);
    setSaveToText(false);
    await fetch(`${API_URL}/api/stories`)
      .then((res) => res.json())
      .then((data) => setData(`${data.generations[0].text.slice(0, -1)}`))
      .catch((err) => console.log(err));
  }

  const handleSaveToText = () => {
    setSaveToText(true);
    let sliced_message = data.slice(0, 320); // Twilio recommends less than 320 characters
    console.log(sliced_message);
    setMessage(sliced_message); // Twilio recommends less than 320 characters, sets message to the sliced_message
  };

  //Sends Twilio Text Message
  const sendTwilioText = () => {
    // Check phone number length. If acceptable, send text message. Otherwise, alert the user.
    if (phoneNumber.length === 10) {
      console.log(message);
      fetch(
        `${API_URL}/send-twilio-text?phoneNumber=${phoneNumber}&message=${message}`
      ).catch((err) => console.log(err));
      setSaveToText(false);
    } else {
      alert("Phone number must be 10 digits without dashes or spaces");
    }
  };

  return (
    <div className="App">
      <div className="App-container">
        <div>
          <h1>Cohere Campfire Creator</h1>
          <p>
            This website allows the user to generate a story or question for
            exciting fun at a campfire! If you really like what is generated,
            you can send it to your phone via a Twilio text message!
          </p>
        </div>
        <div>
          <p>Choose what you want to generate!</p>
          <button onClick={() => handleCategory("activities")}>
            Activities
          </button>
          <button onClick={() => handleCategory("questions")}>Questions</button>
          <button onClick={() => handleCategory("stories")}>Stories</button>
          <button onClick={() => handleCategory("truth")}>Truth</button>
        </div>
        <div className="Generate-container">
          {category === "activities" ? (
            <div>
              <h2>Activities</h2>
              <p>
                Click on the button to generate some activities to do during
                camping.
              </p>
              <button onClick={() => handleSubmit("activities")}>
                Generate a list of activities
              </button>
            </div>
          ) : category === "questions" ? (
            <div>
              <h2>Questions</h2>
              <p>
                Click on the button to generate an exciting question to ask! Leads to deep conversations around the campfire!
              </p>
              <button onClick={() => handleSubmit("questions")}>
                Generate a question
              </button>
            </div>
          ) : category === "stories" ? (
            <div>
              <h2>Stories</h2>
              <p>
                Click on the button to generate the title of a scary story! It
                will also generate some snippets of the story as a reference, and someone can improvise the rest!
              </p>
              <button onClick={() => fetchStory()}>Generate a story</button>
            </div>
          ) : category === "truth" ? (
            <div>
              <h2>Truth</h2>
              <p>
                Click on the button to generate 3-4 questions for the Truth
                Game! A little bit more 'random' than the Questions category. Select one to ask!
              </p>
              <button onClick={() => handleSubmit("truth")}>
                Generate truth questions
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <h1>Result:</h1>
          <div className="Result-container">
            {!data ? (
              <h3>Your generation will appear here. Please wait patiently.</h3>
            ) : (
              <div>
                <h3>{data}</h3>
                <div>
                  <button onClick={handleSaveToText}>Save to Text</button>
                  {saveToText && (
                    <button onClick={() => setSaveToText(false)}>Cancel</button>
                  )}
                </div>
                {saveToText && (
                  <div className="Number-container">
                    <label>Input your Phone Number (format: 3101234567) </label>
                    <input
                      value={phoneNumber}
                      placeholder="Phone Number"
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                    <button onClick={() => sendTwilioText()}>Submit</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
