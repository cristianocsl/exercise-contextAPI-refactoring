// src/App.js

import React, { Component } from 'react';
import Posts from './components/Posts';
import Selector from './components/Selector';
import MyContext from './context/context';

class App extends Component {
  componentDidMount() {
    const { getPosts, selectedSubreddit } = this.context;
    getPosts(selectedSubreddit);
  }

  // componentDidUpdate(prevProps) {
  //   const { props } = this;

  //   if (prevProps.selectedSubreddit !== props.selectedSubreddit) {
  //     const { getPosts, selectedSubreddit } = props;
  //     getPosts(selectedSubreddit);
  //   }
  // } // não entendi por que não usa mais essa função!!!

  selectSubreddit(nextSubreddit) {
    // const { dispatch } = this.props;
    // dispatch(selectSubreddit(nextSubreddit)); // a action recebia o próximo subreddit, mas agora é a função que faz o fetch.
    const { getPosts } = this.context;
    getPosts(nextSubreddit);
  }

  handleRefreshClick(event) {
    event.preventDefault();

    // const { dispatch, selectedSubreddit } = this.props;
    // dispatch(refreshSubreddit(selectedSubreddit));
    // dispatch(fetchPostsIfNeeded(selectedSubreddit));
    const { getPosts, selectedSubreddit } = this.context;
    getPosts(selectedSubreddit);
  }

  renderLastUpdatedAt() {
    const { lastUpdated } = this.context; // lastUpdated vinha de this.props.

    return <span>{`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}.`}</span>;
  }

  renderRefreshButton() {
    const { isFetching } = this.context; // antes vinha de this.props

    return (
      <button
        type="button"
        onClick={(event) => this.handleRefreshClick(event)}
        disabled={isFetching}
      >
        Refresh
      </button>
    );
  }

  render() {
    const {
      availableSubreddits,
      selectedSubreddit,
      posts,
      isFetching,
      lastUpdated,
    } = this.context;

    const isEmpty = posts.length === 0;

    return (
      <div>
        <Selector
          value={selectedSubreddit}
          onChange={(nextSubreddit) => this.selectSubreddit(nextSubreddit)}
          options={availableSubreddits}
        />
        <div>
          {lastUpdated && this.renderLastUpdatedAt()}
          {this.renderRefreshButton()}
        </div>
        {isFetching && <h2>Loading...</h2>}
        {!isFetching && isEmpty && <h2>Empty.</h2>}
        {!isFetching && !isEmpty && <Posts posts={posts} />}
      </div>
    );
  }
}

App.contextType = MyContext;

export default App;
