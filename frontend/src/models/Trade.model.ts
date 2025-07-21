import type { Card } from "./Card.model";

export type TradeCardType = 'OFFERING' | 'RECEIVING';

export interface TradeCard {
    id: string;
    cardId: string;
    tradeId: string;
    type: TradeCardType;
    card: Card;
}

export interface TradeUser {
    name: string;
}

export interface Trade {
    id: string;
    userId: string;
    createdAt: string;
    user: TradeUser;
    tradeCards: TradeCard[];
}

export interface TradesResponse {
    list: Trade[];
    rpp: number;
    page: number;
    more: boolean;
}

export interface PostTradeCard {
    cardId: string;
    type: TradeCardType;
}

export interface PostTradeBody {
    cards: PostTradeCard[];
}