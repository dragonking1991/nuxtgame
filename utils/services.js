export const stringify = (payload) => {
  if (typeof payload === 'string') {
    return payload;
  }
  return JSON.stringify(payload, null, 4);
}

export const sendResizeWindowEvent = (heightPx) => {
  sendIframeEvent('resizeWindow', stringify({ height: heightPx }));
}

export const sendNavigationEvent = (url, newTab) => {
  const payload = stringify({ action: 'web_view', url, newTab });
  sendIframeEvent('onAction', payload);
}

export const sendCloseGameEvent = () => {
  sendIframeEvent('closeGame');
}

export const getQueryParams = () => {
  sendIframeEvent('getQueryParams');
}

export const getModeEvent = () => {
  const info = document.getElementById('getModeResult');
  info.textContent = 'Getting mode...';
  sendIframeEvent('getMode');
}

export const sendSaveDataEvent = (useLocalStorage) => {
  const info = document.getElementById('saveAppDataResult');
  info.textContent = 'Saving data...';
  const dataJson = document.getElementById('saveAppDataInput')?.value;
  sendIframeEvent('saveData', stringify({ dataJson, useLocalStorage }));
}

export const sendLoadDataEvent = (useLocalStorage) => {
  sendIframeEvent('loadData', stringify({ useLocalStorage }));
}

export const sendGetProfileEvent = () => {
  sendIframeEvent('getProfile');
}

export const sendLoginEvent = () => {
  console.log('sendLoginEvent');
  const payload = stringify({ action: 'login' });
  sendIframeEvent('onAction', payload);
}

export const sendSignupEvent = () => {
  console.log('sendSignupEvent');
  const payload = stringify({ action: 'signup' });
  sendIframeEvent('onAction', payload);
}

export const callNgpsArbiterGateway = async () => {
  const data = await parseWithUploadedImage(document.getElementById('ngpsArbiterGatewayInput')?.value);

  sendIframeEvent('callNgpsArbiterGateway', data);
  handleNgpsArbiterGatewayResponse('Calling promo+...');
}

const parseWithUploadedImage = async (data) => {
  if (document.getElementById('ngpsArbiterGatewayFileInput').files.length) {
    data = JSON.parse(data);
    if (!data.body) {
      data.body = {};
    }
    if (!data.body.optionalInformation) {
      data.body.optionalInformation = {};
    }
    data.body.optionalInformation.participationImage = await imageToBase64(document.getElementById('ngpsArbiterGatewayFileInput').files[0])
    data = JSON.stringify(data)
  }

  return data;
}

export const imageToBase64 = async (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    try {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    } catch (error) {
      reject(error);
    }
  });

export const sendIframeEvent = (event, param) => {
  console.log('sendIframeEvent', event, param);
  const message = stringify({ event, param });
  window?.parent.postMessage(message, '*');
}


export const listenToParentMessages = () => {
  window.addEventListener('message', handleParentMessage);
}

const responseHandlers = {
  // resizeWindowResponse: handleResizeWindowResponse,
  // getQueryParams: handleGetQueryParamsResponse,
  // getProfileResponse: handleGetProfileResponse,
  // ngpsArbiterGatewayResponse: handleNgpsArbiterGatewayResponse,
  // ngpsPublicListPrizesGatewayResponse: handleNgpsPublicListPrizesGatewayResponse,
  // sendGameResultResponse: handleSendGameResultResponse,
  // burnPincodeResponse: handleBurnPincodeResponse,
  // getWalletStatusResponse: handleGetWalletStatus,
  // redeemPrizeResponse: handleRedeemPrizeResponse,
  // firebaseEventSent: handleSendFirebaseEventResponse,
  // dataSaved: handleDataSavedResponse,
  // dataLoaded: handleDataLoadedResponse,
  // getModeResponse: handleGetModeResponse
};

export const handleParentMessage = (messageEvent) => {
  let payload;
  try {
    payload = JSON.parse(messageEvent.data);
  } catch (error) {
    payload = messageEvent.data;
  }

  if (payload?.event) {
    responseHandlers[payload.event]?.(payload);
  }
}

export const handleGetWalletStatus = (payload) => {
  const info = document.getElementById('walletStatus');
  info.textContent = stringify(payload);
}

export const handleRedeemPrizeResponse = (payload) => {
  const info = document.getElementById('redeemPrizeResult');
  info.textContent = stringify(payload);
}

export const handleResizeWindowResponse = (payload) => {
  // const info = document.getElementById('resizeWindowResponse');
  // info.textContent = stringify(payload);
}

export const handleGetQueryParamsResponse = (payload) => {
  const info = document.getElementById('getQueryParams');
  info.textContent = stringify(payload);
}

export const handleGetProfileResponse = (payload) => {
  const info = document.getElementById('getProfileData');

  if (isUserLoggedIn(payload)) {
    if (getProfileDataEnabled(payload)) {
      info.textContent = stringify(payload);
    } else {
      info.textContent = `Full profile data could not be received.\n` +
        `Received user uuid: ${payload.data.profile.uuid.substring(0, 4)}(...), ` +
        `and token: ${payload.data.profile.token.substring(0, 4)}(...).`;
    }
  } else {
    info.textContent = 'No profile data received. User is not logged in.';
  }
}

export const handleNgpsArbiterGatewayResponse = (payload) => {
  document.getElementById('ngpsArbiterGatewayResult').textContent = stringify(payload);
}

export const handleNgpsPublicListPrizesGatewayResponse = (payload) => {
  document.getElementById('ngpsPublicListPrizesGatewayResult').textContent = stringify(payload);
}

export const handleSendGameResultResponse = (payload) => {
  const info = document.getElementById('gameResult');
  info.textContent = stringify(payload);
}

export const handleBurnPincodeResponse = (payload) => {
  const info = document.getElementById('burnPincodeResult');
  info.textContent = stringify(payload);
}

export const handleSendFirebaseEventResponse = (payload) => {
  const {
    data: { original_event_name },
  } = payload;
  const eventResponseFieldMap = {
    game_started: 'gameStartedResponse',
    button_clicked: 'buttonClickedResponse',
  };
  const info = document.getElementById(eventResponseFieldMap[original_event_name] || '');

  if (info) {
    info.textContent = stringify(payload);
  }
}

export const handleDataSavedResponse = (response) => {
  const info = document.getElementById('saveAppDataResult');
  info.textContent = stringify(response);
}

export const handleDataLoadedResponse = (response) => {
  const info = document.getElementById('loadAppDataResult');
  info.textContent = stringify(response);
}

export const handleGetModeResponse = (response) => {
  const info = document.getElementById('getModeResult');
  info.textContent = stringify(response);
}

export const isUserLoggedIn = (payload) => {
  return payload?.data?.profile;
}

export const getProfileDataEnabled = (payload) => {
  return payload?.data?.profile?.firstName && payload?.data?.profile?.email;
}
