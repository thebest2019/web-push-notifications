

const client = (() => {
    let serviceWorkerRegObject = undefined;
    const showNotification = async () => {
        const reg = await navigator.serviceWorker.getRegistration()
        reg.showNotification('Abc Title', {
            body: 'Abc description',
            icon: 'icons/icon.png',
            actions: [
                { action: 'closeLink', title: 'Dimiss', icon: 'icons/close.png' },
                { action: 'openLink', title: 'Show Details', icon: 'icons/link.png' }
            ]
        })
    }

    const btnNotify = document.getElementById('btn-notify');
    btnNotify.addEventListener('click', showNotification);

    const checkNotificationSupport = () => {
        if (!('Notification' in window)) {
            return Promise.reject("the browser does not support notification.");
        }
        console.log("notification support available")
        return Promise.resolve('notification ok');
    }

    const registerServiceWorker = async () => {
        if (!('serviceWorker' in navigator)) {
            return Promise.reject("the browser does not support service worker.");
        }

        try {
            const regObj = await navigator.serviceWorker.register('service-worker.js');
            console.log('register service worker successfully');
            serviceWorkerRegObject = regObj;
        } catch (err) {
            return console.error(err);
        }
    }

    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();
        console.log('request permission', permission);
    }

    checkNotificationSupport()
        .then(registerServiceWorker)
        .then(requestNotificationPermission)
        .catch((err) => console.error(err));

})();