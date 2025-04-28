
import JitsiMeet from './jitsiMeet';

const MeetingPage = () => {
  return (
    <div>
      <h1 className="text-center">Live Meeting</h1>
      <JitsiMeet roomName="MySchoolRoom2025" displayName="Admin User" />
    </div>
  );
};

export default MeetingPage;
