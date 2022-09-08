import React, { useState } from 'react';
import { useAuthUser } from 'hooks';
import { MainWrapper, TrackerCalendar, TimeInspector } from 'components';
import { ProfileEditView } from './ProfileEditView';

const ProfilePage = () => {
  const { user } = useAuthUser();
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  return (
    <MainWrapper
      sidebar={
        <>
          <TimeInspector />
          <TrackerCalendar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </>
      }
    >
      <ProfileEditView id={user.id} />
    </MainWrapper>
  );
};

export default ProfilePage;
