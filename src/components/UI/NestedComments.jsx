import { Fragment, useState } from "react";
import commentsData from "../../utils/comments.json";
import useCommentsTree from "../../hooks/useCommentsTree";

const commentBtnClass =
  "p-2 text-sm cursor-pointer bg-[#007bff] text-white border-none rounded-lg transition-all hover:bg-[#0056b3]";

const commentTextArea =
  "w-full p-3 outline-none border-2 border-blue-100 rounded-lg resize-none";

const addCommentClass = "flex gap-1 mx-1 my-0 mb-3";

const CommentNode = ({
  comment = {},
  onSubmitComment = () => {},
  onEditComment = () => {},
  onDeleteComment = () => {},
}) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onSubmitComment(comment.id, replyContent);
      setReplyContent("");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditedContent(comment.content); // Reset edited content to current comment content
  };

  const handleChange = (e) => {
    if (editMode) {
      setEditedContent(e.target.value);
    } else {
      setReplyContent(e.target.value);
    }
  };

  const handleEditSubmit = () => {
    onEditComment(comment.id, editedContent);
    setEditMode(false);
  };

  return (
    <Fragment>
      <div className="bg-blue-100 p-2 m-2 border-l-2 border-l-[#007bff]">
        {!editMode ? (
          <div className="mb-3">
            <p className="m-0 px-1 py-0 text-md">{comment.content}</p>
            <p className="m-0 px-1 py-0 text-xs text-gray-600">
              {new Date(comment.timestamp).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className={addCommentClass}>
            <textarea
              value={editedContent}
              onChange={handleChange}
              rows={3}
              cols={50}
              className={commentTextArea}
            />
            <button onClick={handleEditSubmit} className={commentBtnClass}>
              Save Edit
            </button>
            <button onClick={toggleEditMode} className={commentBtnClass}>
              Cancel Edit
            </button>
          </div>
        )}

        <div className="flex gap-2 mx-1 my-0">
          <button onClick={toggleExpand} className={`${commentBtnClass}`}>
            {expand ? "Hide Replies" : "Reply"}
          </button>
          <button onClick={toggleEditMode} className={commentBtnClass}>
            Edit
          </button>
          <button
            onClick={() => onDeleteComment(comment.id)}
            className={commentBtnClass}
          >
            Delete
          </button>
        </div>
        {expand && (
          <div className="mt-3">
            <div className={addCommentClass}>
              <textarea
                value={replyContent}
                onChange={handleChange}
                placeholder="Add a reply..."
                rows={3}
                cols={50}
                className={commentTextArea}
              />
              <button onClick={handleReplySubmit} className={commentBtnClass}>
                Submit Reply
              </button>
            </div>
            {comment?.replies?.map((reply) => (
              <CommentNode
                key={reply.id}
                comment={reply}
                onSubmitComment={onSubmitComment}
                onEditComment={onEditComment}
                onDeleteComment={onDeleteComment}
              />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

const NestedComments = () => {
  const [comment, setComment] = useState("");

  const {
    comments: commentData,
    insertComment,
    editComment,
    deleteComment,
  } = useCommentsTree(commentsData);

  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
  };

  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId);
  };

  const handleEditChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment);
      setComment("");
    }
  };

  return (
    <div className="flex flex-col w-[80%] p-3 justify-start">
      <h1 className="text-4xl font-bold text-[#007bff] mb-4">Nested Comment</h1>
      <div className={addCommentClass}>
        <textarea
          value={comment}
          rows={3}
          cols={50}
          placeholder="Add a comment here..."
          onChange={handleEditChange}
          className={commentTextArea}
        />
        <button onClick={handleSubmit} className={commentBtnClass}>
          Add Comment
        </button>
      </div>
      {commentData.map((comment) => {
        return (
          <CommentNode
            key={comment.id}
            comment={comment}
            onSubmitComment={handleReply}
            onEditComment={handleEdit}
            onDeleteComment={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default NestedComments;
