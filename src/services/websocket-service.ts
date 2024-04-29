import { RxStomp } from "@stomp/rx-stomp";
import config from '../config/config.json';

// interface webSocketService{
//     stompClient: CompatClient,
//     connect: (topic: string, callback: (data: any) => void) => void,
//     subscribeToUpdates: (topic: string, callback: (data: any) => void) => void
// }

// const WebSocketService: webSocketService = {
//   stompClient: undefined,

//   connect: (topic: string, callback: (data: any) => void) => {
//     const socket = new WebSocket('ws://localhost:8081/productWebserver');
//     WebSocketService.stompClient = new RxStomp().cli .over(socket);
//     WebSocketService.stompClient.connect({}, () => {
//       console.log('WebSocket connected');
//       WebSocketService.subscribeToUpdates(topic, callback);
//     });
//   },

//   subscribeToUpdates: (topic: string, callback: (data: any) => void) => {
//     WebSocketService.stompClient.subscribe(topic, (message) => {
//       callback?.(message.body);
//     //   const updatedProduct = JSON.parse(message.body);    
//     //   ProductService.updateProduct(updatedProduct);
//     });
//   },
// };

class WebSocketService {
  rxStomp: RxStomp;

  constructor() {
    this.rxStomp = new RxStomp();
    this.rxStomp.configure({
      webSocketFactory: () => new WebSocket(config.productWebserver)      
    });
    this.rxStomp.activate();    
  }

  subscribeToMessages(topic: string, callback: (data: any) => void) {
    return this.rxStomp.watch(topic).subscribe((message) => {      
      callback(message.body);
    });
  }
}

export default WebSocketService;