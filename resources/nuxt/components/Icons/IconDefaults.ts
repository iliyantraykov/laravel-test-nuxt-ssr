// import { cloneDeep } from 'lodash';

const path: Object = {
  path: '',
  fill: 'none',
  stroke: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeMiterlimit: '10',
  strokeWidth: '1.2'
};

const circle: Object = {
  circle: true,
  r: '0.5',
  fill: 'none',
  stroke: 'none',
  cx: '0',
  cy: '0'
};

const ellipse: Object = {
  ecplise: true,
  fill:'none',
  cx:'11.938',
  cy:'8.291',
  rx:'5.708',
  ry:'6.854'
};

const polygon: Object = {
  polygon: true,
  fill:'none',
  points:''
};

const rect: Object = {
  rect: true,
  fill:'none',
  width: '24',
  height: '24',
  y:'1'
};

export {
  path,
  circle,
  ellipse,
  polygon,
  rect
};
