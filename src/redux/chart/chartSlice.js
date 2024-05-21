import api from '../api';

const querySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    GetQueryList: builder.query({
      query: (data) => `api/chart/all/?limit=12&offset=${data.page}&ordering=${data?.sorting}`,
      providesTags: ({ results }) =>
        results
          ? [...results.map(({ id }) => ({ type: 'QueryList', id })), { type: 'QueryList', id: 'LIST' }]
          : [{ type: 'QueryList', id: 'LIST' }],

      transformResponse(response) {
        return { data: response?.results, count: response?.count };
      }
    }),

    getChartDetail: builder.query({
      query: (id) => `api/chart/${id}/`
    }),

    getSpeciaList: builder.query({
      query: () => 'accounts/api/specialist/list/'
    }),
    AssignCharts: builder.mutation({
      query: (data) => ({
        url: 'api/chart/assign-carts/',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: [{ type: 'QueryList', id: 'LIST' }]
    }),
    GetChartQuerys: builder.query({
      query: (id) => `queries/api/chart/${id}/queries/`,
      providesTags: [{ type: 'ChartQuerys', id: 'LIST' }]
    }),
    GetUserQueryTemplate: builder.query({
      query: () => `queries/api/querytemplate/list/`
    }),
    CreateQuery: builder.mutation({
      query: (data) => ({
        url: 'queries/api/query/create/',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'ChartQuerys', id: 'LIST' }]
    })
  })
});

export const {
  useGetQueryListQuery,
  useGetChartDetailQuery,
  useGetSpeciaListQuery,
  useAssignChartsMutation,
  useGetChartQuerysQuery,
  useGetUserQueryTemplateQuery,
  useCreateQueryMutation
} = querySlice;
