import axios from "axios";
import React, { Component } from "react";
import "./chucknorris.css";
import BeatLoader from "react-spinners/BeatLoader";

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
  onChange = (cat) => {
    const joke = async () => {
      const url = `https://api.chucknorris.io/jokes/random?category=${this.state.category}`;
      const res = await axios.get(url);
      this.setState({ joke: res.data.value });
    };

    this.setState({ category: cat }, () => {
      joke();
    });
  };

  async componentDidMount() {
    const url = "https://api.chucknorris.io/jokes/categories";
    const res = await axios.get(url);
    this.setState({ categories: res.data, loading: false });
  }
  render() {
    return (
      <div className="container">
        <div className="category-list-container">
          {this.state.loading ? <BeatLoader color={'#1581c4'} size={20} /> : null}
          {this.state.categories.length ? (
            <ul className="category-list">
              {this.state.categories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`cat-btn ${
                      cat === this.state.category ? "cat-active" : ""
                    }`}
                    onClick={(e) => {
                      this.onChange(cat);
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

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
          onClick={(e) => {
            this.onChange(this.state.category);
          }}
        >
          New joke
        </button>
      </div>
    );
  }
}
