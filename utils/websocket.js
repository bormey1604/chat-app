import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient;

export const connectWebSocket = (onMessageReceived) => {
  const socket = new SockJS('http://localhost:8080/ws'); 
  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log('Connected to WebSocket');
      stompClient.subscribe('/topic/public', (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    },
    onStompError: (error) => {
      console.error('WebSocket error:', error);
    },
  });

  stompClient.activate();
};

export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(message),
    });
  }
};
