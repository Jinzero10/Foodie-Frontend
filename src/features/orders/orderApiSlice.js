import { apiSlice } from "../app/api/apiSlice";

export const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => "/order/getallorder",
            transformResponse: (response) => response.allOrder,
            providesTags: (result, error, arg) => {
                if (result) {
                    return [
                        { type: "Order", id: "LIST" },
                        ...result.map((id) => ({ type: "Order", id })),
                    ];
                } else return [{ type: "Order", id: "LIST" }];
            },
        }),
        addOrder: builder.mutation({
            query: (data) => ({
                url: "/order",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Order"],
        }),
        getUserOrder: builder.query({
            query: () => ({
                url: `/order`,
                transformResponse: (response) => response.order,
            }),
            providesTags: [{ type: "Order", id: "LIST" }],
        }),
        getAllOrderStatus: builder.query({
            query: () => ({
                url: `/order/getallstatus`,
            }),
            providesTags: [{ type: "Order", id: "LIST" }],
        }),
        changeOrderStatus: builder.mutation({
            query: (data) => ({
                url: `/order`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Order"],
        }),
        deleteOrder: builder.mutation({
            query: (data) => ({
                url: `/order`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Order"],
        }),
    }),
});

export const {
    useGetAllOrderQuery,
    useGetAllOrderStatusQuery,
    useAddOrderMutation,
    useGetUserOrderQuery,
    useDeleteOrderMutation,
    useChangeOrderStatusMutation,
} = orderSlice;
