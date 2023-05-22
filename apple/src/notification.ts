import * as forge from 'node-forge'

export interface AppleNotification {
    notificationType: string,
    notificationUUID: string,
    data: {
        appAppleId: number,
        bundleId: string,
        bundleVersion: string,
        environment: string,
        signedTransactionInfo: string
    }
}
export function decodePayload(signedPayload: string) {
    let [part1, part2, part3] = signedPayload.split('.');
    const part2Text = forge.util.decode64(part2).replace(/(\x00)+/, '');
    const notification = JSON.parse(part2Text);
    try {
        const data = JSON.parse(forge.util.decode64(notification.data.signedTransactionInfo.split('.')[1]).replace(/(\x00)+/, ''));
        const result: AppleNotification = {
            ...notification, data
        }
        return result;
    } catch (error) {

    }
    return { signedPayload };
}