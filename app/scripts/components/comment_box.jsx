var comments = [
  {id: 1, name: 'foo', text: 'bar'},
  {id: 2, name: 'foo2', text: 'bar2'}
];

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []}
  },
  componentDidMount: function() {
    this.fetchComment();
  },
  fetchComment: function() {
    this.setState({data: comments});
  },
  postComment: function(comment) {
    data = this.state.data;
    data.push(comment);
    this.setState({data: data});
  },
  render: function() {
    return (
      <div className="commentBox">
        <CommentForm commentHandler={this.postComment} />
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <li className="commentList__comment">
        <div className="commentList__name">
          {this.props.name}
        </div>
        <div className="commentList__body">
          {this.props.children}
        </div>
      </li>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var comments = this.props.data.map(function(comment) {
      return (
        <Comment key={comment.id} name={comment.name}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <ul className="commentList">
        {comments}
      </ul>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    nameElem = React.findDOMNode(this.refs.name);
    commentElem = React.findDOMNode(this.refs.comment);
    comment = {
      name: nameElem.value.trim(),
      text: commentElem.value.trim()
    };
    commentElem.value = '';
    this.props.commentHandler(comment);
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <div className="commentForm__name">
          <input type="text" placeholder="Your name..." ref="name" />
        </div>
        <div className="commentForm__body">
          <input type="text" placeholder="Comment here..." ref="comment" />
        </div>
        <div className="commentForm__submit">
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
});
