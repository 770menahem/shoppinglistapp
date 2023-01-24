import * as mongoose from 'mongoose';
import { logInfo } from '../log/logger';

/**
 * Connect to mongo
 */
export default async (uri: string) => {
    logInfo('Connecting to Mongo');

    await mongoose.connect(uri);
    mongoose.set('strictQuery', false);

    logInfo('Mongo connection established');
};
