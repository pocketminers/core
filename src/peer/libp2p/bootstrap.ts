import { Multiaddr, multiaddr } from '@multiformats/multiaddr';
import { bootstrap} from '@libp2p/bootstrap';
import { PocketArgument, PocketParameter } from '@components/base';
import { PocketConfiguration } from '@components/common';


const getLibp2pBootstrapParameters = (): PocketParameter[] => {
    const parameters: PocketParameter[] = [
       new PocketParameter<boolean>({
            name: 'Default Config', 
            key: 'defaultConfig',
            description: 'Use default bootstrap configuration',
            default: true,
            required: false
        }),
        new PocketParameter<Array<Multiaddr | string>>({
            name: 'Multiaddrs',
            key: 'multiaddrs',
            description: 'Custom bootstrap configuration',
            default: [],
            required: false,
        }),
        new PocketParameter<boolean>({
            name: 'List',
            key: 'list',
            description: 'List bootstrap configuration, instead of returning a function',
            default: false,
            required: false,
        })
    ];

    return parameters;
}


/**
 * Default bootstrap configuration for libp2p
 * @category Libp2p
 */
const defaultBootstrapConfig: Array<string> = [
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
]


const libp2pBootstrap = (args?: PocketArgument[]): any | Array<string> => {

    const libp2pBoiotstrapConfig = new PocketConfiguration({
        args,
        params: getLibp2pBootstrapParameters()
    });
    
    const addrs: Array<string> = new Array<string>();

    const {
        defaultConfig,
        multiaddrs,
        list 
    } = libp2pBoiotstrapConfig.preparedArgs({ allowNonRequired: true });

    if (defaultConfig === true) {
        defaultBootstrapConfig.forEach((addr: string) => {
            addrs.push(addr)
        })
    }

    if (multiaddrs ? multiaddrs?.length > 0 : false) {
        multiaddrs?.forEach((addr: Multiaddr | string) => {
            if (typeof addr === 'string') {
                addrs.push(addr)
            }
            else {
                addrs.push(multiaddr(addr).toString())
            }
        })
    }

    if (list === true) {
        return addrs
    }

    return bootstrap({ list: addrs })
}


export {
    libp2pBootstrap,
    getLibp2pBootstrapParameters
}