import { apiSlice } from "../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        categories: builder.query({
            query: () => "/category",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },

            transformResponse: (response) => response.categories,
            providesTags: (result, error, arg) => {
                if (result) {
                    return [
                        { type: "Category", id: "LIST" },
                        ...result.map((id) => ({ type: "Category", id })),
                    ];
                } else return [{ type: "Category", id: "LIST" }];
            },
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: "/category",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Category", id: "LIST" }],
        }),
        updateCategory: builder.mutation({
            query: (data) => ({
                url: `/category/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: [{ type: "Category", id: "LIST" }],
        }),
        deleteCategory: builder.mutation({
            query: (data) => ({
                url: `/category/${data.id}`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {
    useCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApiSlice;
