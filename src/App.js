import "./App.css";
import { useState } from "react";

function App() {
  const API_URL = "https://coherecampingcreator.herokuapp.com";

  const [data, setData] = useState(null);
  const [category, setCategory] = useState("activities");

  // When handleSubmit is called, fetches API call from /api/category and then gets assigns response to data
  const handleSubmit = (categ) => {
    setData(null);
    fetch(`${API_URL}/api/${categ}`)
      .then((res) => res.json())
      .then((data) => setData(`${data.generations[0].text.slice(0, -1)}`));
  };

  // Async to fetch long api call for the scary story
  async function fetchStory() {
    setData(null);
    await fetch(`${API_URL}/api/stories`)
    .then((res) => res.json())
    .then((data) => setData(`${data.generations[0].text.slice(0, -1)}`))
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <div className="App-container">
        <div>
          <h1>Cohere Campfire Creator</h1>
        </div>
        <div>
          <button onClick={() => setCategory("activities")}>Activities</button>
          <button onClick={() => setCategory("questions")}>Questions</button>
          <button onClick={() => setCategory("stories")}>Stories</button>
        </div>
        <div>
          {category === "activities" ? (
            <div>
              <button onClick={() => handleSubmit("activities")}>
                Generate a list of activities
              </button>
            </div>
          ) : category === "questions" ? (
            <div>
              <button onClick={() => handleSubmit("questions")}>
                Generate a list of questions
              </button>
            </div>
          ) : category === "stories" ? (
            <div>
              <button onClick={() => fetchStory()}>Generate a list of stories</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <h1>Result:</h1>
          <h3>{!data ? "Your generation will appear here:" : data}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;