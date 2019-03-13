import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import React from 'react';
import { Card, Image } from 'semantic-ui-react'
import '../styles/PostModal.css';
import 'font-awesome/css/font-awesome.min.css';


export default class PostModal extends React.Component {
  render() {
    const { url, title, author, selftext, subreddit, thumbnail } = this.props
    const notImage = [ 'self', 'default' ]
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <div className="modal-padding">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="modal-author"> Posted by {author} in {subreddit}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { !notImage.includes(thumbnail) && <Image floated='right' src={thumbnail} rounded bordered size="tiny" />}
          <h4>{title}</h4>
          <div className="external-link"><i className="fa fa-external-link"></i> {url}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
        </div>
      </Modal>
    );
  }
}
