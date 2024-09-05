import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.pedagang-ecommerce.site",
    mode: "cors",
    credentials: "include",
  }),
  tagTypes: ["Cart", "Order"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({ url: "customers/cart" }),

      providesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: () => ({
        url: "customers/cart",
      }),
      invalidatesTags: ["Cart"],
    }),
    getOrder: builder.query({
      query: ({
        page = 1,
        limit = 10,
        orderBy = "order_date",
        orderDir = "asc",
      }) => ({
        url: `customers/orders?page=${page}&limit=${limit}&order_by=${orderBy}&order_dir=${orderDir} `,
      }),
      transformResponse: (response) => ({
        data: response.data,
        total_page: Math.ceil(response.total_count.total / 10),
      }),

      providesTags: ["Order"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartMutation,
  useGetOrderQuery,
  useLazyGetOrderQuery,
} = apiSlice;

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://api.pedagang-ecommerce.site",
//     mode: "cors",
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     getCart: builder.query({
//       query: () => "customers/cart",
//       masukkan id di parameter query method diatas untuk menambahkan string di pathnya
//     }),
//   }),
// });
