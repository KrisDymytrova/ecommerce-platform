import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IRefreshToken extends Document {
    token: string;
    user: IUser['_id'];
    expiresAt: Date;
}

const RefreshTokenSchema: Schema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);

export default RefreshToken;
