import { apiSlice } from "../app/api/apiSlice";

export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        product: builder.query({
            query: () => "/product",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },

            transformResponse: (response) => response.products,
            providesTags: (result, error, arg) => {
                if (result) {
                    return [
                        { type: "Product", id: "LIST" },
                        ...result.map((id) => ({ type: "Product", id })),
                    ];
                } else return [{ type: "Product", id: "LIST" }];
            },
        }),
        addProduct: builder.mutation({
            query: (productData) => ({
                url: "/product",
                method: "POST",
                body: productData,
                formData: true,
            }),
            invalidatesTags: [{ type: "Product", id: "LIST" }],
        }),
        editProduct: builder.mutation({
            query: ({ id, productData }) => ({
                url: `/product/${id}`,
                method: "PUT",
                body: productData,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: builder.mutation({
            query: (data) => ({
                url: `/product/${data.id}`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useProductQuery,
    useAddProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
} = productSlice;
