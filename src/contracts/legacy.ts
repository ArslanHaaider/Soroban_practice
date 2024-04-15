import * as Client from '../../packages/legacy/src/index';
import { rpcUrl } from './util';

export default new Client.Contract({
  ...Client.networks.testnet,
  rpcUrl,
});
