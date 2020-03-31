import * as APIUtil from "../util/keyword_api_util";

export const RECEIVE_ALL_KEYWORDS = "RECEIVE_ALL_KEYWORDS";
export const RECEIVE_KEYWORD = "RECEIVE_KEYWORD";

export const receiveKeywords = keywords => {
    return {
        type: RECEIVE_ALL_KEYWORDS,
        keywords
    };
};

export const receiveKeyword = keyword => {
    return {
        type: RECEIVE_KEYWORD,
        keyword
    };
};

export const createKeyword = keyword => dispatch => {
    return APIUtil.createKeyword(keyword);

};

export async function fetchKeyword(keyword) {
    return APIUtil.fetchKeyword(keyword);

};
