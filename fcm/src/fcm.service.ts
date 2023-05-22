import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import * as firebaseAdmin from 'firebase-admin';
import { FcmOptions } from './fcm.options';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class FcmService {
    constructor(
        private fcmOptionsProvider: FcmOptions,
    ) {
        if (firebaseAdmin.apps.length === 0) {
            firebaseAdmin.initializeApp({
                credential: firebaseAdmin.credential.cert(
                    this.fcmOptionsProvider.serviceAccount
                ),
            });
        }
    }

    private readonly options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
    };

    private readonly optionsSilent = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
        content_available: true,
    };

    async sendNotification(
        deviceIds: Array<string>,
        payload: firebaseAdmin.messaging.MessagingPayload,
        silent: boolean,
    ) {
        if (deviceIds.length == 0) {
            throw new Error('You provide an empty device ids list!');
        }

        let result = null;
        try {
            result = await firebaseAdmin
                .messaging()
                .sendToDevice(
                    deviceIds,
                    payload,
                    silent ? this.optionsSilent : this.options,
                );
        } catch (error) {
            throw error;
        }
        return result;
    }

    /**
     *
     * @param topic `all` is send to all devices
     * @param payload ref: firebaseAdmin.messaging.MessagingPayload
     * @param silent
     * @returns
     */
    async sendToTopic(
        topic: 'all' | string,
        payload: firebaseAdmin.messaging.MessagingPayload,
        silent: boolean,
    ) {
        if (!topic && topic.trim().length === 0) {
            throw new Error('You provide an empty topic name!');
        }

        let result = null;
        try {
            result = await firebaseAdmin
                .messaging()
                .sendToTopic(
                    topic,
                    payload,
                    silent ? this.optionsSilent : this.options,
                );
        } catch (error) {
            throw error;
        }
        return result;
    }
    async subscribeToTopic(registrationTokenOrTokens: string | string[], topic: string) {
        return await firebaseAdmin.messaging().subscribeToTopic(registrationTokenOrTokens, topic)
    }
    async unsubscribeFromTopic(registrationTokenOrTokens: string | string[], topic: string) {
        return await firebaseAdmin.messaging().unsubscribeFromTopic(registrationTokenOrTokens, topic)
    }
    async send(message:Message) {
        return await firebaseAdmin.messaging().send(message);
    }
}
