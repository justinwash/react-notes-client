import React, { useState, useEffect } from 'react';
import { PageHeader, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { API } from 'aws-amplify';

import './Home.css';

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadNotes() {
    return API.get('notes', '/notes');
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <ListGroupItem
            header={
              note.title
                ? note.title.trim().split('\n')[0]
                : note.content.trim().split('\n')[0]
            }
          >
            {note.tags &&
              note.tags.map((tag) => {
                return <Badge>{tag}</Badge>;
              })}
            {' Created: ' + new Date(note.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key='new' to='/notes/new'>
          <ListGroupItem>
            <h4>
              <b>{'\uFF0B'}</b> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className='lander'>
        <h1>Notes</h1>
        <p>It's a app log in or something</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className='notes'>
        <PageHeader>Notes</PageHeader>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }

  return (
    <div className='Home'>
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
