import { useGetUserProfileQuery } from "../features/users/userApiSlice";

const useProfile = () => {
    const { data, isSuccess } = useGetUserProfileQuery();

    if (isSuccess) {
        const { name, address, email, phoneNumber, zipcode } = data.user;

        return {
            name,
            address,
            zipcode,
            userAddress: address,
            email,
            phoneNumber,
            userPhoneNumber: phoneNumber,
            userZipcode: zipcode,
        };
    }

    return {
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
        zipcode: "",
        userZipcode: "",
        userAddress: "",
        userPhoneNumber: "",
    };
};
export default useProfile;
