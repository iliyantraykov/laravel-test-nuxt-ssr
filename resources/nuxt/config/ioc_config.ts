import 'reflect-metadata';

import { Container } from 'inversify';

import FetchInterface  from '../services/fetch/FetchInterface';

import {
  Fetch,
} from '../services';

import SERVICE_IDENTIFIER from './constants/Identifiers';

const container = new Container();

container.bind<FetchInterface>(SERVICE_IDENTIFIER.FETCH).to(Fetch);

export default container;
