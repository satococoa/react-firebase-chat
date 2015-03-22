var comments = [
  {id: 1, author: 'foo', text: 'bar'},
  {id: 2, author: 'foo2', text: 'bar2'}
];

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <CommentList data={comments} />
        <CommentForm />
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <li>{this.props.author}: {this.props.children}</li>
    )
  }
});

var CommentList = React.createClass({
  render: function() {
    var comments = this.props.data.map(function(comment) {
      return (
        <Comment key={comment.id} author={comment.author}>
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
        <input type="text" placeholder="Your name..." ref="name" />
        <textarea ref="comment"></textarea>
      </form>
    );
  }
});
