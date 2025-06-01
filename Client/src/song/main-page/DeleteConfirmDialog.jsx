import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteConfirmDialog({ show, onHide, onConfirm, songTitle }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Smazat píseň</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Opravdu chcete smazat píseň "{songTitle}"?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Zrušit
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmDialog;