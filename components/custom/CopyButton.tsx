import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { useClipboard } from 'use-clipboard-copy';
import Icon from '../icon/Icon';
import showNotification from '../extras/showNotification';
import { toast } from 'react-toastify';

interface ICopyButtonProps {
  icon: string;
  forceFamily?: 'custom' | 'material' | null;
  content: string;
}
const CopyButton: FC<ICopyButtonProps> = ({ icon, forceFamily, content }) => {
  const clipboard = useClipboard();
  return (
    <Icon
      icon={icon}
      size="lg"
      className="cursor-pointer"
      forceFamily={forceFamily}
      onClick={() => {
        clipboard.copy(content);
        toast.info('Copy to Clipboard');
      }}
    />
  );
};
CopyButton.propTypes = {
  icon: PropTypes.string.isRequired,
  forceFamily: PropTypes.oneOf([null, 'custom', 'material']),
  content: PropTypes.string.isRequired,
};
CopyButton.defaultProps = {
  forceFamily: null,
};

export default CopyButton;
