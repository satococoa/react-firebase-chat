// setup firebase
var firebaseRef = new Firebase("https://reactchat-satococoa.firebaseio.com/");

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []}
  },
  componentDidMount: function() {
    this.fetchComment();
  },
  fetchComment: function() {
    firebaseRef.child('comments').on('child_added', function(snapshot) {
      comment = snapshot.val();
      comment.id = snapshot.key();
      data = this.state.data;
      data.push(comment);
      this.setState({data: data});
    }.bind(this));
  },
  postComment: function(comment) {
    firebaseRef.child('comments').push(comment);
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
        {comments.reverse()}
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
