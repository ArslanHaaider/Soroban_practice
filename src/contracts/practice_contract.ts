import * as Client from '../../packages/practice_contract/src/index';
import { rpcUrl } from './util';

export default new Client.Contract({
  ...Client.networks.testnet,
  rpcUrl,
});
