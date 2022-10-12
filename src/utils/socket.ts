import store from '@/store';

export function getDefaultSocketOptions() {
    const userState = store.getState().user.userInfo;

    return {
        transports: ["websocket"],
        query: {
            token: userState?.token,
        }
    };
}
