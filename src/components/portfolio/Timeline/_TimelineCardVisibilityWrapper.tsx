import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import { TimelineCard } from '@/components/portfolio/Timeline/TimelineCard';
import { EventProps } from '@/types';

type TimelineCardVisibilityWrapperProps = {
  event: EventProps;
  // addJoinerLine: boolean;
  // cardId: string;
  // endDate: string;
  // description: string;
  // location: string;
  // logoImage: string;
  // startDate: string;
  // techlist: Array<string>;
  // title: string;
  // websiteDomain: string;
};

export const TimelineCardVisibilityWrapper = (
  props: TimelineCardVisibilityWrapperProps
) => {
  const { event } = props;
  const [cardIsVisible, setCardVisible] = useState<boolean>(false);
  // const [cardIsClicked, setCardClicked] = useState<boolean>(false);

  const onVisibleChange = (isVisible: boolean) => setCardVisible(isVisible);
  // const onCardClicked = () => setCardClicked(!cardIsClicked);

  return (
    <VisibilitySensor
      partialVisibility={true}
      onChange={onVisibleChange}
      offset={{ bottom: 200 }}
    >
      <TimelineCard
        event={event}
        cardIsVisible={cardIsVisible}
        // cardIsClicked={cardIsClicked}
        // cardIsVisible={cardIsVisible}
        // onCardClicked={onCardClicked}
        // {...props}
      />
    </VisibilitySensor>
  );
};
