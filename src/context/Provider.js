import React from 'react';
import MyContext from '../context/context';
import { getPostsBySubreddit } from '../services/redditAPI'; // função que faz fetch da api

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // this.state criado a partir das props de App.js no render()
      selectedSubreddit: 'reactjs', // primeiro valor selecionado para a tag select.
      availableSubreddits: ['reactjs', 'frontend'],
      isFetching: false,
      // lastUpdated,
      // postsBySubreddit fornece ['reactjs', 'frontend'] para availableSubreddits através de Object.keys(postsBySubreddit),
      posts: [],
      getPosts: this.getPosts,
    };
  }

  getPosts = async (selectedSubreddit) => {
    this.setState({ isFetching: true });
    const result = await getPostsBySubreddit(selectedSubreddit);
    // console.log(result.data.children[0].data.title) // em Posts.js, posts recebia o array 'result.data.children', mas teve que adaptar o acesso às chaves 'id' e 'title', e isso foi feito assim: {data: {id, title}}
    this.setState({
      posts: result.data.children,
      selectedSubreddit: selectedSubreddit,
      lastUpdated: Date.now(), // executa Date.now() e seta o state lastUpdated no momento do fetch da api.
      isFetching: false,
    });
  }

  render() {
    const { children } = this.props;
    const state = { ...this.state }
    return(
      <MyContext.Provider value={ state }>
        { children }
      </MyContext.Provider>
    );
  }
}

export default Provider;
