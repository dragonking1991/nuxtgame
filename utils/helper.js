export const getOrientation = (event) => {
  return {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma,
  }
};

export const getRandom = (max, min = 0) => {
  const now = new Date().getTime();
  const seed = now % (max + min + 1);
  return seed - min;
}
export const getRandomColor = () => {
  const red = getRandom(255);
  const green = getRandom(255 - 1);
  const blue = getRandom(255 - 2);
  return `rgb(${red},${green},${blue})`;
}

export const getMotion = (event) => {
  const acr = event.acceleration
  return {
    x: acr.x,
    y: acr.y,
    y: acr.y,
  }
};
export function requestDeviceMotionPermission() {
  try {

    const $deviceMotionEvent = DeviceMotionEvent;
    if (typeof $deviceMotionEvent.requestPermission === 'function') {
      return $deviceMotionEvent.requestPermission().then((permission) => {
        if (permission !== 'granted') {
          console.error('Request to access the device motion was rejected');
        }
        return permission === 'granted';
      })
        .catch((reason) => {
          console.error('Request to access the device motion failed', reason);
          return false;
        });
    }
    return true;
  } catch (error) {
    console.log(JSON.stringify(error))
  }
}
export function requestDeviceOrientationPermission() {
  try {
    const $deviceOrientationEvent = DeviceOrientationEvent;
    if (typeof $deviceOrientationEvent.requestPermission === 'function') {
      return $deviceOrientationEvent.requestPermission().then((permission) => {
        if (permission !== 'granted') {
          console.error('Request to access the device motion was rejected');
        }
        return permission === 'granted';
      })
        .catch((reason) => {
          console.error('Request to access the device motion failed', reason);
          return false;
        });
    }
    return true;
  } catch (error) {
    console.log(error);
  }
}