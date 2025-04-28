import { JaaSMeeting } from '@jitsi/react-sdk';

const JitsiMeetingRoom = () => {
  const appId = 'vpaas-magic-cookie-57667d2df40b40e5a248960e2eaa3079';
  const jwt = 'eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtNTc2NjdkMmRmNDBiNDBlNWEyNDg5NjBlMmVhYTMwNzkvM2M3NTY5LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3NDQ5MDcxMjksImV4cCI6MTc0NDkxNDMyOSwibmJmIjoxNzQ0OTA3MTI0LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtNTc2NjdkMmRmNDBiNDBlNWEyNDg5NjBlMmVhYTMwNzkiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImtwcmFodWwxMTQzIiwiaWQiOiJnb29nbGUtb2F1dGgyfDEwNDY0NzM0OTY1Nzc4NDI3OTE4NyIsImF2YXRhciI6IiIsImVtYWlsIjoia3ByYWh1bDExNDNAZ21haWwuY29tIn19LCJyb29tIjoiKiJ9.fWWqBMi-QkYMfEnMkXbXOBA-Thal_PJO9pxXf6Smifu5TH-aDqnTg8-IoVIGgWHYECuHLOkNfh8M1Ncue57KjhEDGl1Z3fw5kkEp8ALzL_dp9SL4WJtGvXe1p1fp0W-w9P0rg8bAYk20zY2ysr5IQI9CD8EujYu0ikT7r5NMBg54CtGKn2ItePddvDMMjkKtoUky1CMfUvBr_SFAUKdra1DDpcfszzhgl2b11eWgbQEbzPd4a-BPGRgV2GmCYp6ZOxSul019xU3uG0DYEua7oPESl8SC1CcSK6q93pcEOCfrE46vlYO31CAiRrfUndxACPNwIGAPd0AEuHkcaBkxOA'; // shortened here for readability

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <JaaSMeeting
        appId={appId}
        roomName="school-meeting-2025"
        jwt={jwt}
        useStaging={true}
        configOverwrite={{
          disableLocalVideoFlip: true,
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          enableClosePage: true,
        }}
        interfaceConfigOverwrite={{
          VIDEO_LAYOUT_FIT: 'nocrop',
          MOBILE_APP_PROMO: false,
          TILE_VIEW_MAX_COLUMNS: 4,
          SHOW_JITSI_WATERMARK: false,
        }}
        spinner={() => <div style={{ textAlign: 'center' }}>Loading meeting...</div>}
        onApiReady={(externalApi) => {
          console.log('🔗 Jitsi External API Ready:', externalApi);
        }}
        getIFrameRef={(iframeRef) => {
          console.log('📺 iframe ready:', iframeRef);
        }}
      />
    </div>
  );
};

export default JitsiMeetingRoom;
