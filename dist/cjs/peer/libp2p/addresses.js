"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateListenAddresses = exports.getLibp2pListenAddressParameters = void 0;
const configuration_1 = require("../../components/common/configuration.js");
const parameter_1 = require("../../components/base/parameter.js");
/**
 * The getLibp2pListenAddresses function returns an array of PocketParameter objects for configuring libp2p listen addresses.
 */
const getLibp2pListenAddressParameters = () => {
    const Libp2pListenAddresses = new Array();
    Libp2pListenAddresses.push(new parameter_1.PocketParameter({
        name: "Enable TCP",
        key: "enableTcp",
        description: "Enable TCP transport.",
        default: true,
        required: false
    }), new parameter_1.PocketParameter({
        name: "TCP Listen Port",
        key: "tcpPort",
        description: "The port the TCP transport will listen on.",
        default: 0,
        required: false
    }), new parameter_1.PocketParameter({
        name: "Enable IPv4",
        key: "enableIp4",
        description: "Enable IPv4 transport",
        default: true,
        required: false
    }), new parameter_1.PocketParameter({
        name: "IPv4 Domain",
        key: "ip4Domain",
        description: "IPv4 domain",
        default: "0.0.0.0",
        required: false
    }), new parameter_1.PocketParameter({
        name: "Enable UDP",
        key: "enableUdp",
        description: "Enable UDP transport",
        default: true,
        required: false
    }), new parameter_1.PocketParameter({
        name: "UDP Port",
        key: "udpPort",
        description: "UDP port",
        default: 0,
        required: false
    }), new parameter_1.PocketParameter({
        name: "Enable IPv6",
        key: "enableIp6",
        description: "Enable IPv6 transport",
        default: true,
        required: false
    }), new parameter_1.PocketParameter({
        name: "IPv6 Domain",
        key: "ip6Domain",
        description: "IPv6 domain",
        default: "::",
        required: false
    }), new parameter_1.PocketParameter({
        name: "Enable Circuit Relay Transport Listening",
        key: "enableCircuitRelayTransportListening",
        description: "Enable Circuit Relay transport listening",
        default: false,
        required: false
    }), new parameter_1.PocketParameter({
        name: "Enable QUIC",
        key: "enableQuicv1",
        description: "Enable QUIC transport",
        default: true,
        required: false
    }), new parameter_1.PocketParameter({
        name: "Enable WebTransport",
        key: "enableWebTransport",
        description: "Enable WebTransport transport",
        default: true,
        required: false
    }), new parameter_1.PocketParameter({
        name: "Enable WebSockets",
        key: "enableWebSockets",
        description: "Enable WebSockets transport",
        default: true,
        required: false
    }), new parameter_1.PocketParameter({
        name: "Enable WebRTC",
        key: "enableWebRTC",
        description: "Enable WebRTC transport",
        default: true,
        required: false
    }), new parameter_1.PocketParameter({
        name: "Enable WebRTC Star",
        key: "enableWebRTCStar",
        description: "Enable WebRTC Star transport",
        default: false,
        required: false
    }), new parameter_1.PocketParameter({
        name: "WebRTC Star Address",
        key: "webRTCStarAddress",
        description: "WebRTC Star address",
        required: false
    }), new parameter_1.PocketParameter({
        name: "Enable Circuit Relay Transport",
        key: "enableCircuitRelayTransport",
        description: "Enable Circuit Relay transport",
        default: true,
        required: false
    }), new parameter_1.PocketParameter({
        name: "Additional Multiaddrs",
        key: "additionalMultiaddrs",
        description: "Additional multiaddrs",
        required: false
    }));
    return Libp2pListenAddresses;
};
exports.getLibp2pListenAddressParameters = getLibp2pListenAddressParameters;
const generateListenAddresses = (args) => {
    const listenAddressConfig = new configuration_1.PocketConfiguration({
        args,
        params: getLibp2pListenAddressParameters()
    });
    const { enableTcp, tcpPort, enableIp4, ip4Domain, enableUdp, udpPort, enableIp6, ip6Domain, enableCircuitRelayTransportListening, enableQuicv1, enableWebTransport, enableWebSockets, enableWebRTC, enableWebRTCStar, webRTCStarAddress, additionalMultiaddrs } = listenAddressConfig.preparedArgs();
    const listenAddresses = new Array();
    if (enableIp4) {
        if (enableTcp) {
            listenAddresses.push(`/ip4/${ip4Domain}/tcp/${tcpPort}`);
        }
        if (enableUdp) {
            listenAddresses.push(`/ip4/${ip4Domain}/udp/${udpPort}`);
        }
        if (enableQuicv1 && enableTcp) {
            listenAddresses.push(`/ip4/${ip4Domain}/udp/${udpPort}/quic-v1`);
        }
        if (enableWebTransport && enableUdp) {
            listenAddresses.push(`/ip4/${ip4Domain}/udp/${udpPort}/quic-v1/webtransport`);
        }
        if (enableWebSockets && enableTcp) {
            listenAddresses.push(`/ip4/${ip4Domain}/tcp/${tcpPort}/ws/`);
        }
    }
    if (enableIp6) {
        if (enableTcp) {
            listenAddresses.push(`/ip6/${ip6Domain}/tcp/${tcpPort}`);
        }
        if (enableUdp) {
            listenAddresses.push(`/ip6/${ip6Domain}/udp/${udpPort}`);
        }
        if (enableQuicv1 && enableTcp) {
            listenAddresses.push(`/ip6/${ip6Domain}/udp/${udpPort}/quic-v1`);
        }
        if (enableWebTransport && enableUdp) {
            listenAddresses.push(`/ip6/${ip6Domain}/udp/${udpPort}/quic-v1/webtransport`);
        }
        if (enableWebSockets && enableTcp) {
            listenAddresses.push(`/ip6/${ip6Domain}/tcp/${tcpPort}/ws/`);
        }
    }
    if (enableWebRTC) {
        listenAddresses.push('/webrtc');
    }
    if (enableCircuitRelayTransportListening) {
        listenAddresses.push('/p2p-circuit');
    }
    if (enableWebRTCStar === true) {
        if (webRTCStarAddress === undefined || webRTCStarAddress === null) {
            throw new Error('webrtcStarAddress must be provided');
        }
        listenAddresses.push(webRTCStarAddress.toString());
    }
    if (additionalMultiaddrs ? additionalMultiaddrs?.length > 0 : false) {
        additionalMultiaddrs?.forEach((addr) => {
            if (typeof addr === 'string') {
                listenAddresses.push(addr);
            }
            else {
                listenAddresses.push(addr.toString());
            }
        });
    }
    return { listen: listenAddresses };
};
exports.generateListenAddresses = generateListenAddresses;
//# sourceMappingURL=addresses.js.map