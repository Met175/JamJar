import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteConfirmDialog({ show, onHide, onConfirm, songTitle }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Song</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the song "{songTitle}"?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmDialog;