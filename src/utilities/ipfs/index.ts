import { CID } from 'multiformats/cid';
import * as sha256 from 'multiformats/hashes/sha2';
import * as dagPB from '@ipld/dag-pb';

async function createCID() {
  const bytes = dagPB.encode({ Data: new TextEncoder().encode('Hello, IPFS!'), Links: [] });
  const hash = await sha256.sha256.digest(bytes);
  const cid = CID.create(1, dagPB.code, hash);
  console.log(cid.toString());
}

export {
    createCID
}