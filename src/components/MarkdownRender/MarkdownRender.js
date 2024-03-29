import React from 'react';
import ReactMarkdown from 'react-markdown';

import './MarkdownRender.css';

const markdownRender = (props) => {
  const { note } = props;
  const imageExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  function formatFilename(str) {
    return str ? str.replace(/^\w+-/, '') : '';
  }

  return (
    <div class='MarkdownRender'>
      <h2 id='content-header'>{note.title}</h2>
      <hr></hr>
      <div>
        <ReactMarkdown escapeHtml={false} source={note.content} />
      </div>
      <hr></hr>
      <div class='MarkdownRenderAttachments'>
        {imageExtensions.exec(note.attachment) ? (
          <img alt='attachment' src={note.attachmentURL} />
        ) : (
          <a href={note.attachmentURL}>{formatFilename(note.attachment)}</a>
        )}
      </div>
    </div>
  );
};

export default markdownRender;
