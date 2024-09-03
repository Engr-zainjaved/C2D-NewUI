import React from 'react';
import Icon from '../../../../components/icon/Icon';
import { IProjectItem } from '../../../../type/common-interface';
import { stagesInfo } from '../../../../common/data/trackingHistoryData';
import { calculateTimeAgoUTC } from '../../../../common/function/utilities';
import Avatar from '../../../../components/Avatar';
import Popovers from '../../../../components/bootstrap/Popovers';
import Button from '../../../../components/bootstrap/Button';
import Spinner from '../../../../components/bootstrap/Spinner';

interface HistoryItemStageProps {
  item: IProjectItem;
}
const HistoryItemStage: React.FC<HistoryItemStageProps> = ({ item }) => {
  const stage = item.target_stage || item.source_stage;
  return (
    <div className="history-item-wrapper d-flex flex-column gap-3">
      <div>
        <div className="d-flex gap-4 align-items-center justify-content-between">
          <div className="stage-heading d-flex align-items-center gap-3">
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
            <b>
              {item.tracking_type === 'stage' && <span>STAGE CHANGE :</span>}
              {item.tracking_type === 'push' && <span>PUSH CHANGE</span>}
            </b>
            {item.source_stage === 'development' && <span>Development</span>}
            {item.source_stage === 'staging' && <span>Staging</span>}
            {item.source_stage === 'production' && <span>Production</span>}

            {item.target_stage && item.source_stage && <span style={{ margin: '0 4px 0 4px' }}>&gt;</span>}

            {item.target_stage === 'development' && <span>Development</span>}
            {item.target_stage === 'staging' && <span>Staging</span>}
            {item.target_stage === 'production' && <span>Production</span>}
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
        {item.additional_title && (
          <div className="stage-heading d-flex gap-3">
            &gt;
            <small> {'item.additional_title'}</small>
          </div>
        )}
      </div>
      <div className="commit stage-commit d-flex align-items-center gap-2">
        <div>
          <span
            dangerouslySetInnerHTML={{
              // @ts-ignore
              __html: stagesInfo[stage].description.replace(/\n/g, '<br />'),
            }}
          />
        </div>
      </div>
      {item.additional_message && (
        <div className="commit stage-commit d-flex align-items-center gap-2">
          <div>
            <span>{item.additional_message}</span>
          </div>
        </div>
      )}
      <div className="d-flex align-items-center gap-4">
        <div className="commit-user d-flex align-items-center gap-2">
          <Avatar src={item.pusher_avatar_url} size={24} className="profile-photo" />
          {item.pusher_name}
        </div>
        <div className="commit-details d-flex align-items-center gap-3">
          <span className="d-flex align-items-center">• {calculateTimeAgoUTC(item?.date_created)}</span>
          {item.build != null && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryItemStage;
