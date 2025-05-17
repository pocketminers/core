import { PocketConfiguration } from "../../components/common/configuration.js";
import { PocketParameter } from "../../components/base/parameter.js";
/**
 * The getLibp2pListenAddresses function returns an array of PocketParameter objects for configuring libp2p listen addresses.
 */
var getLibp2pListenAddressParameters = function () {
    var Libp2pListenAddresses = new Array();
    Libp2pListenAddresses.push(new PocketParameter({
        name: "Enable TCP",
        key: "enableTcp",
        description: "Enable TCP transport.",
        default: true,
        required: false
    }), new PocketParameter({
        name: "TCP Listen Port",
        key: "tcpPort",
        description: "The port the TCP transport will listen on.",
        default: 0,
        required: false
    }), new PocketParameter({
        name: "Enable IPv4",
        key: "enableIp4",
        description: "Enable IPv4 transport",
        default: true,
        required: false
    }), new PocketParameter({
        name: "IPv4 Domain",
        key: "ip4Domain",
        description: "IPv4 domain",
        default: "0.0.0.0",
        required: false
    }), new PocketParameter({
        name: "Enable UDP",
        key: "enableUdp",
        description: "Enable UDP transport",
        default: true,
        required: false
    }), new PocketParameter({
        name: "UDP Port",
        key: "udpPort",
        description: "UDP port",
        default: 0,
        required: false
    }), new PocketParameter({
        name: "Enable IPv6",
        key: "enableIp6",
        description: "Enable IPv6 transport",
        default: true,
        required: false
    }), new PocketParameter({
        name: "IPv6 Domain",
        key: "ip6Domain",
        description: "IPv6 domain",
        default: "::",
        required: false
    }), new PocketParameter({
        name: "Enable Circuit Relay Transport Listening",
        key: "enableCircuitRelayTransportListening",
        description: "Enable Circuit Relay transport listening",
        default: false,
        required: false
    }), new PocketParameter({
        name: "Enable QUIC",
        key: "enableQuicv1",
        description: "Enable QUIC transport",
        default: true,
        required: false
    }), new PocketParameter({
        name: "Enable WebTransport",
        key: "enableWebTransport",
        description: "Enable WebTransport transport",
        default: true,
        required: false
    }), new PocketParameter({
        name: "Enable WebSockets",
        key: "enableWebSockets",
        description: "Enable WebSockets transport",
        default: true,
        required: false
    }), new PocketParameter({
        name: "Enable WebRTC",
        key: "enableWebRTC",
        description: "Enable WebRTC transport",
        default: true,
        required: false
    }), new PocketParameter({
        name: "Enable WebRTC Star",
        key: "enableWebRTCStar",
        description: "Enable WebRTC Star transport",
        default: false,
        required: false
    }), new PocketParameter({
        name: "WebRTC Star Address",
        key: "webRTCStarAddress",
        description: "WebRTC Star address",
        required: false
    }), new PocketParameter({
        name: "Enable Circuit Relay Transport",
        key: "enableCircuitRelayTransport",
        description: "Enable Circuit Relay transport",
        default: true,
        required: false
    }), new PocketParameter({
        name: "Additional Multiaddrs",
        key: "additionalMultiaddrs",
        description: "Additional multiaddrs",
        required: false
    }));
    return Libp2pListenAddresses;
};
var generateListenAddresses = function (args) {
    var listenAddressConfig = new PocketConfiguration({
        args: args,
        params: getLibp2pListenAddressParameters()
    });
    var _a = listenAddressConfig.preparedArgs(), enableTcp = _a.enableTcp, tcpPort = _a.tcpPort, enableIp4 = _a.enableIp4, ip4Domain = _a.ip4Domain, enableUdp = _a.enableUdp, udpPort = _a.udpPort, enableIp6 = _a.enableIp6, ip6Domain = _a.ip6Domain, enableCircuitRelayTransportListening = _a.enableCircuitRelayTransportListening, enableQuicv1 = _a.enableQuicv1, enableWebTransport = _a.enableWebTransport, enableWebSockets = _a.enableWebSockets, enableWebRTC = _a.enableWebRTC, enableWebRTCStar = _a.enableWebRTCStar, webRTCStarAddress = _a.webRTCStarAddress, additionalMultiaddrs = _a.additionalMultiaddrs;
    var listenAddresses = new Array();
    if (enableIp4) {
        if (enableTcp) {
            listenAddresses.push("/ip4/".concat(ip4Domain, "/tcp/").concat(tcpPort));
        }
        if (enableUdp) {
            listenAddresses.push("/ip4/".concat(ip4Domain, "/udp/").concat(udpPort));
        }
        if (enableQuicv1 && enableTcp) {
            listenAddresses.push("/ip4/".concat(ip4Domain, "/udp/").concat(udpPort, "/quic-v1"));
        }
        if (enableWebTransport && enableUdp) {
            listenAddresses.push("/ip4/".concat(ip4Domain, "/udp/").concat(udpPort, "/quic-v1/webtransport"));
        }
        if (enableWebSockets && enableTcp) {
            listenAddresses.push("/ip4/".concat(ip4Domain, "/tcp/").concat(tcpPort, "/ws/"));
        }
    }
    if (enableIp6) {
        if (enableTcp) {
            listenAddresses.push("/ip6/".concat(ip6Domain, "/tcp/").concat(tcpPort));
        }
        if (enableUdp) {
            listenAddresses.push("/ip6/".concat(ip6Domain, "/udp/").concat(udpPort));
        }
        if (enableQuicv1 && enableTcp) {
            listenAddresses.push("/ip6/".concat(ip6Domain, "/udp/").concat(udpPort, "/quic-v1"));
        }
        if (enableWebTransport && enableUdp) {
            listenAddresses.push("/ip6/".concat(ip6Domain, "/udp/").concat(udpPort, "/quic-v1/webtransport"));
        }
        if (enableWebSockets && enableTcp) {
            listenAddresses.push("/ip6/".concat(ip6Domain, "/tcp/").concat(tcpPort, "/ws/"));
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
    if (additionalMultiaddrs ? (additionalMultiaddrs === null || additionalMultiaddrs === void 0 ? void 0 : additionalMultiaddrs.length) > 0 : false) {
        additionalMultiaddrs === null || additionalMultiaddrs === void 0 ? void 0 : additionalMultiaddrs.forEach(function (addr) {
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
export { getLibp2pListenAddressParameters, generateListenAddresses };
//# sourceMappingURL=addresses.js.map