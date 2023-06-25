import beepSound from '../assets/beep.wav'

const Beep = new Audio(beepSound);

export const playBeep = ()=> Beep.play();