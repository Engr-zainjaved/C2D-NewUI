import React, { Dispatch, SetStateAction, ReactNode } from 'react';
import Modal from '../../../components/bootstrap/Modal';
import { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import { TModalSize } from '../../../type/modal-type';

interface Props {
  title: string;
  titleIcon?: ReactNode | any;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  size?: TModalSize;
}

const C2DModal: React.FC<Props> = ({ title, open, setOpen, children, titleIcon, size }) => {
  return (
    <Modal
      isOpen={open}
      setIsOpen={setOpen}
      titleId={title?.toLowerCase()?.replaceAll(' ', '-')}
      isAnimation={false}
      isCentered
      size={size}
      className="modal c2d-modal">
      <ModalHeader className="c2d-modal-header" setIsOpen={setOpen}>
        <ModalTitle id={title?.toLowerCase()?.replaceAll(' ', '-')} className="d-flex align-items-center ">
          {Boolean(titleIcon) ? titleIcon : null} {title}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="c2d-modal-body">{children}</ModalBody>
    </Modal>
  );
};

export default C2DModal;
