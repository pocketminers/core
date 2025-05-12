import { PocketArgument } from "@components/argument";
import { PocketConfiguration } from "@components/configuration";
import { PocketParameter } from "@components/parameter";
import { BaseValue, BaseValueKey } from "@templates/v0";
import { Multiaddr } from "multiaddr";


/**
 * The getLibp2pListenAddresses function returns an array of PocketParameter objects for configuring libp2p listen addresses.
 */
const getLibp2pListenAddressParameters = (): PocketParameter[] => {
    const Libp2pListenAddresses: PocketParameter[] = new Array<PocketParameter>();

    Libp2pListenAddresses.push(
        new PocketParameter<boolean>({
            name: "Enable TCP",
            key: "enableTcp",
            description: "Enable TCP transport.",
            default: true,
            required: false
        }),
        new PocketParameter<number>({
            name: "TCP Listen Port",
            key: "tcpPort",
            description: "The port the TCP transport will listen on.",
            default: 0,
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Enable IPv4",
            key: "enableIp4",
            description: "Enable IPv4 transport",
            default: true,
            required: false
        }),
        new PocketParameter<string>({
            name: "IPv4 Domain",
            key: "ip4Domain",
            description: "IPv4 domain",
            default: "0.0.0.0",
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Enable UDP",
            key: "enableUdp",
            description: "Enable UDP transport",
            default: true,
            required: false
        }),
        new PocketParameter<number>({
            name: "UDP Port",
            key: "udpPort",
            description: "UDP port",
            default: 0,
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Enable IPv6",
            key: "enableIp6",
            description: "Enable IPv6 transport",
            default: true,
            required: false
        }),
        new PocketParameter<string>({
            name: "IPv6 Domain",
            key: "ip6Domain",
            description: "IPv6 domain",
            default: "::",
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Enable Circuit Relay Transport Listening",
            key: "enableCircuitRelayTransportListening",
            description: "Enable Circuit Relay transport listening",
            default: false,
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Enable QUIC",
            key: "enableQuicv1",
            description: "Enable QUIC transport",
            default: true,
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Enable WebTransport",
            key: "enableWebTransport",
            description: "Enable WebTransport transport",
            default: true,
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Enable WebSockets",
            key: "enableWebSockets",
            description: "Enable WebSockets transport",
            default: true,
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Enable WebRTC",
            key: "enableWebRTC",
            description: "Enable WebRTC transport",
            default: true,
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Enable WebRTC Star",
            key: "enableWebRTCStar",
            description: "Enable WebRTC Star transport",
            default: false,
            required: false
        }),
        new PocketParameter<string>({
            name: "WebRTC Star Address",
            key: "webRTCStarAddress",
            description: "WebRTC Star address",
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Enable Circuit Relay Transport",
            key: "enableCircuitRelayTransport",
            description: "Enable Circuit Relay transport",
            default: true,
            required: false
        }),
        new PocketParameter<boolean>({
            name: "Additional Multiaddrs",
            key: "additionalMultiaddrs",
            description: "Additional multiaddrs",
            required: false
        })
    );

    return Libp2pListenAddresses;
}

const generateListenAddresses = (args: PocketArgument[]): { listen: Array<string> } => {
    const listenAddressConfig = new PocketConfiguration({
        args,
        params: getLibp2pListenAddressParameters()
    });

    const {
        enableTcp,
        tcpPort,
        enableIp4,
        ip4Domain,
        enableUdp,
        udpPort,
        enableIp6,
        ip6Domain,
        enableCircuitRelayTransportListening,
        enableQuicv1,
        enableWebTransport,
        enableWebSockets,
        enableWebRTC,
        enableWebRTCStar,
        webRTCStarAddress,
        additionalMultiaddrs
    } = listenAddressConfig.preparedArgs();

    const listenAddresses = new Array<string>();

    if (enableIp4) {
        if (enableTcp) {
            listenAddresses.push(`/ip4/${ip4Domain}/tcp/${tcpPort}`)
        }
        if (enableUdp) {
            listenAddresses.push(`/ip4/${ip4Domain}/udp/${udpPort}`)
        }
        if (enableQuicv1 && enableTcp) {
            listenAddresses.push(`/ip4/${ip4Domain}/udp/${udpPort}/quic-v1`)
        }
        if (enableWebTransport && enableUdp) {
            listenAddresses.push(`/ip4/${ip4Domain}/udp/${udpPort}/quic-v1/webtransport`)
        }
        if (enableWebSockets && enableTcp) {
            listenAddresses.push(`/ip4/${ip4Domain}/tcp/${tcpPort}/ws/`)
        }
    }

    if (enableIp6) {
        if (enableTcp) {
            listenAddresses.push(`/ip6/${ip6Domain}/tcp/${tcpPort}`)
        }
        if (enableUdp) {
            listenAddresses.push(`/ip6/${ip6Domain}/udp/${udpPort}`)
        }
        if (enableQuicv1 && enableTcp) {
            listenAddresses.push(`/ip6/${ip6Domain}/udp/${udpPort}/quic-v1`)
        }
        if (enableWebTransport && enableUdp) {
            listenAddresses.push(`/ip6/${ip6Domain}/udp/${udpPort}/quic-v1/webtransport`)
        }
        if (enableWebSockets && enableTcp) {
            listenAddresses.push(`/ip6/${ip6Domain}/tcp/${tcpPort}/ws/`)
        }
    }

    if (enableWebRTC) {
        listenAddresses.push('/webrtc')
    }

    if (enableCircuitRelayTransportListening) {
        listenAddresses.push('/p2p-circuit')
    }

    if (enableWebRTCStar === true) {
        if (webRTCStarAddress === undefined || webRTCStarAddress === null) {
            throw new Error('webrtcStarAddress must be provided')
        }
        listenAddresses.push(webRTCStarAddress.toString())
    }

    if (additionalMultiaddrs ? additionalMultiaddrs?.length > 0 : false) {
        additionalMultiaddrs?.forEach((addr: Multiaddr | string) => {
            if (typeof addr === 'string') {
                listenAddresses.push(addr)
            }
            else {
                listenAddresses.push(addr.toString())
            }
        })
    }

    return { listen: listenAddresses }
}




export {
    getLibp2pListenAddressParameters
}