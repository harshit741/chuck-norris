import axios from "axios";
import React, { Component } from "react";
import "./chucknorris.css";

export default class ChuckNorris extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      category: null,
      joke: null,
      loading: true,
    };
  }
  onChange = (e) => {
    const joke = async () => {
      const url = `https://api.chucknorris.io/jokes/random?category=` + cat;
      const res = await axios.get(url);
      this.setState({ joke: res.data.value });
    };
    const cat = e.target.value;
    this.setState({ category: cat });
    joke();
  };

  async componentDidMount() {
    const url = "https://api.chucknorris.io/jokes/categories";
    const res = await axios.get(url);
    this.setState({ categories: res.data, loading: false });
  }
  render() {
    return (
      <div className="container">
        <ul className="category-list">
          {this.state.loading ? <div class="loader" id="loader-1"></div> : ""}
          {this.state.categories.map((cat) => (
            <li key={cat}>
              <button
                value={cat}
                onClick={this.onChange}
                checked={this.state.category === cat}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
        <div className="selected-category">
          Selected Category:{" "}
          {this.state.category ? this.state.category : "None"}
        </div>
        <div className={this.state.joke ? "joke" : ""}>
          <p>{this.state.joke ? this.state.joke : ""}</p>
        </div>
        <button
          className="new-joke-button"
          disabled={this.state.category === null}
          value={this.state.category}
          onClick={this.onChange}
        >
          New joke
        </button>
      </div>
    );
  }
}
