import React from 'react';
import Button from '../../../../components/bootstrap/Button';
import Avatar from '../../../../components/Avatar';
import Icon from '../../../../components/icon/Icon';
import { IProjectItem } from '../../../../type/common-interface';
import Spinner from '../../../../components/bootstrap/Spinner';
import { calculateTimeAgoUTC } from '../../../../common/function/utilities';
import Popovers from '../../../../components/bootstrap/Popovers';

interface IHistoryItemProps {
  item: IProjectItem;
}

const HistoryItem: React.FC<IHistoryItemProps> = ({ item }) => {
  return (
    <div className="history-item-wrapper d-flex flex-column gap-3">
      {item.additional_title && (
        <div className="d-flex gap-3">
          &gt;<span>{item.additional_title}</span>
        </div>
      )}
      <div className="d-flex gap-4 align-items-start justify-content-between">
        <div className="d-flex flex-column gap-1 w-100">
          {item.commits.map((commit) => (
            <div className="commit d-flex align-items-center gap-2">
              <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="11.6958"
                  y="2.03921"
                  width="8"
                  height="8"
                  transform="rotate(45 11.6958 2.03921)"
                  stroke="#CCD2DC"
                  stroke-width="2"
                />
                <path d="M16.8726 7.69629H22.7889" stroke="#CCD2DC" stroke-width="2" />
                <path d="M0.602539 7.69629H6.5189" stroke="#CCD2DC" stroke-width="2" />
              </svg>
              <span
                onClick={() => window.open(commit.provider_url, '_blank')}
                className="cursor-pointer text-decoration-none hover:text-decoration-underline">
                {commit.message}
              </span>
              <span
                className="ms-auto commit-code d-flex gap-1 align-items-center cursor-pointer text-decoration-none hover:text-decoration-underline"
                onClick={() => window.open(commit.provider_url, '_blank')}>
                <Icon icon="CustomGithub" />
                {commit.identifier.slice(0, 7)}
              </span>
            </div>
          ))}
        </div>

        <span style={{ display: 'flex', alignItems: 'center' }}>
          {item.build?.status === 'in_progress' && <Spinner tag="span" color="info" />}

          {item.build?.status === 'success' && item.build?.url ? (
            <Button
              color="success"
              size={'sm'}
              className="connect"
              onClick={() => window.open(item.build?.url, '_blank')}>
              Connect
            </Button>
          ) : item.build?.status === 'dropped' ? (
            <Button className="dropped" size={'sm'} isLight isDisable={true}>
              Dropped
            </Button>
          ) : null}
        </span>
      </div>
      {item.additional_message && (
        <div className="commit">
          <span>{item.additional_message}</span>
        </div>
      )}
      <div className="d-flex align-items-center gap-4">
        <div className="commit-user d-flex align-items-center gap-2">
          <Avatar src={item.pusher_avatar_url} size={24} className="profile-photo" />
          {item.pusher_name}
        </div>
        <div className="commit-details d-flex align-items-center gap-3">
          <span className="d-flex align-items-center">• {calculateTimeAgoUTC(item?.date_created)}</span>
          {/* <span className='d-flex align-items-center'>• Test: success ✓</span> */}
          <span className="d-flex align-items-center">
            • Test:{' '}
            {item.build?.status === 'in_progress' ? (
              <span className="m-2">In Progress</span>
            ) : item.build?.status === 'error' ? (
              <span className="m-2">Error</span>
            ) : item.build?.status === 'expired' ? (
              <span className="m-2">Expired</span>
            ) : item.build?.status === 'success' ? (
              <span className="m-2">Success ✓</span>
            ) : item.build?.status === 'dropped' ? (
              <span className="m-2">Dropped</span>
            ) : item.build?.status === 'restore_succeed' ? (
              <span className="m-2"> Restore Succeed</span>
            ) : item.build?.status === 'restore_failed' ? (
              <span className="m-2"> Restore Failed</span>
            ) : item.build?.status === 'import_succeed' ? (
              <span className="m-2"> Import Succeed</span>
            ) : item.build?.status === 'import_failed' ? (
              <span className="m-2"> Import Failed</span>
            ) : (
              item.build?.status
            )}
            {item.build?.error_message !== '' && (
              <Popovers desc={item.build?.error_message} trigger="hover">
                <Icon icon="EMobiledata" className="text-danger" />
              </Popovers>
            )}
          </span>
          <span className="d-flex align-items-center">
            • Build:
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {item.build?.status === 'in_progress' ? (
                <span className="m-2">In Progress</span>
              ) : item.build?.status === 'error' ? (
                <span className="m-2">Error</span>
              ) : item.build?.status === 'expired' ? (
                <span className="m-2">Expired</span>
              ) : item.build?.status === 'success' ? (
                <span className="m-2">Success</span>
              ) : item.build?.status === 'dropped' ? (
                <span className="m-2">Dropped</span>
              ) : item.build?.status === 'restore_succeed' ? (
                <span className="m-2"> Restore Succeed</span>
              ) : item.build?.status === 'restore_failed' ? (
                <span className="m-2"> Restore Failed</span>
              ) : item.build?.status === 'import_succeed' ? (
                <span className="m-2"> Import Succeed</span>
              ) : item.build?.status === 'import_failed' ? (
                <span className="m-2"> Import Failed</span>
              ) : (
                item.build?.status
              )}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
