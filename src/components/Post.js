import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import Remarkable from 'remarkable'
import '../styles/Post.css';
import 'font-awesome/css/font-awesome.min.css';
import ReactTooltip from 'react-tooltip';
import PostModal from './PostModal.js'

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalShow: false };

  }
  toggleModal(){
    console.log("Helloooo...");
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    const { url, title, author, selftext, thumbnail, subreddit_name_prefixed } = this.props
    const notImage = [ 'self', 'default' ]
    return (
      <div className="main-card" >
          <div className="card-border" >
              <button className="open-modal" data-tip="Open Post" onClick={() => this.setState({ modalShow: true })}> <i className="fa fa-cog fa-spin"></i> </button><ReactTooltip />
              { !notImage.includes(thumbnail) && <Image floated='right' src={thumbnail} rounded bordered size="tiny" />}
              <div className="author">Posted by {author} </div>
              <div className="post-text" >{title}</div>
              <div> {selftext} </div>
              <div className="external-link"><i className="fa fa-external-link"></i> {url}</div>
          </div>
          <PostModal
            show={this.state.modalShow}
            onHide={modalClose}
            subreddit = {subreddit_name_prefixed}
            url={url}
            title={title}
            author={author}
            selftext={selftext}
            thumbnail = {thumbnail}
        />
      </div>
    );
  }
}
