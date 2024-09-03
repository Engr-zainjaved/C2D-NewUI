import { CardSubTitle } from '../../bootstrap/Card';

interface TrackingCardSubtitleProps {
  trackingType?: string | boolean;
  sourceStage?: string | null;
  targetStage?: string | null;
  additionalTitle?: string | '';
}

const TrackingCardSubtitle = ({
  trackingType,
  sourceStage,
  targetStage,
  additionalTitle,
}: TrackingCardSubtitleProps) => {
  if (!trackingType) {
    return null;
  }
  return (
    <CardSubTitle>
      <>
        {trackingType === 'stage' && (
          <strong style={{ marginRight: '5px' }}>
            <small>STAGE CHANGE :</small>
          </strong>
        )}
        {false && (
          <strong style={{ marginRight: '5px' }}>
            <small>PUSH CHANGE</small>
          </strong>
        )}
        {sourceStage === 'development' && <strong>Development</strong>}
        {sourceStage === 'staging' && <strong>Staging</strong>}
        {sourceStage === 'production' && <strong>Production</strong>}

        {targetStage && sourceStage && <span style={{ margin: '0 4px 0 4px' }}>&gt;</span>}

        {targetStage === 'development' && <strong>Development</strong>}
        {targetStage === 'staging' && <strong>Staging</strong>}
        {targetStage === 'production' && <strong>Production</strong>}

        {additionalTitle !== '' && <strong> {additionalTitle}</strong>}
      </>
    </CardSubTitle>
  );
};

export default TrackingCardSubtitle;
