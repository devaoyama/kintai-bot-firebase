import * as functions from 'firebase-functions';
import {expressReceiver} from "./main";

export const slack = functions.https.onRequest(expressReceiver.app);
