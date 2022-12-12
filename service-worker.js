
self.addEventListener('notificationclose', (event) => { 
    console.log('notificationclose', event); 
});

self.addEventListener('notificationclick', event => {
    event.waitUntil((async () => {
        const allClients = await clients.matchAll({
          includeUncontrolled: true
        });
        let chatClient;
        for (const client of allClients) {
          const url = new URL(client.url);
          if (url.pathname === '/chat/') {
            client.focus();
            chatClient = client;
            break;
          }
        }
        if (!chatClient) {
          chatClient = await clients.openWindow('/chat/');
        }
      })());
})