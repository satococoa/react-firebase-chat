var comments = [
  {id: 1, name: 'foo', text: 'bar'},
  {id: 2, name: 'foo2', text: 'bar2'}
];

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <CommentForm />
        <CommentList data={comments} />
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
    )
  }
});

var CommentList = React.createClass({
  render: function() {
    var comments = this.props.data.map(function(comment) {
      return (
        <Comment key={comment.id} name={comment.name}>
          {comment.text}
        </Comment>
      )
    });
    return (
      <ul className="commentList">
        {comments}
      </ul>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <form className="commentForm">
        <div className="commentForm__name">
          <input type="text" placeholder="Your name..." ref="name" />
        </div>
        <div className="commentForm__body">
          <input type="text" placeholder="Comment here..." ref="comment" />
        </div>
      </form>
    );
  }
});
