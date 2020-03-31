import axios from "axios";

export const createKeyword = (keyword) => {
    return axios.post(`/api/keywords`, keyword);
};

export const fetchKeyword = (name) => {
    return axios.get(`/api/keywords/?search=${name}`);
};
