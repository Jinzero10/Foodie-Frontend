import { apiSlice } from "../app/api/apiSlice";

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },

            transformResponse: (response) => response.users,
            providesTags: (result, error, arg) => {
                if (result) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.map((id) => ({ type: "User", id })),
                    ];
                } else return [{ type: "User", id: "LIST" }];
            },
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `/users`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: `/users/profile`,
                transformResponse: (response) => response.user,
            }),
            providesTags: [{ type: "User", id: "LIST" }],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/users/profile`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `/users`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserProfileQuery,
    useRegisterMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userSlice;
