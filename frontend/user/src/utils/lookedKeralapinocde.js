import Keralapinocde from '../data/Keralapinocde.json';
export const lookupKeralaPincode = (pincode) => {
    return Keralapinocde.filter((entry) => entry.pincode === pincode);
};
