import * as functions from 'firebase-functions';
import {expressReceiver} from "./slack";

export const slack = functions.https.onRequest(expressReceiver.app);
