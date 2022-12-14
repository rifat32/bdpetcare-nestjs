import ReviewList from '@/components/reviews/review-list';
import Card from '@/components/common/card';
import Layout from '@/components/layouts/shop';
import { useState } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminAndOwnerOnly } from '@/utils/auth-utils';
import { useRouter } from 'next/router';
import { useReviewsQuery } from '@/graphql/reviews.graphql';
import { useShopQuery } from '@/graphql/shops.graphql';
import {
  QueryReviewsOrderByColumn,
  ReviewPaginator,
  SortOrder,
} from '__generated__/__types__';

export default function Reviews() {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const {
    query: { shop },
  } = useRouter();
  const { data: shopData } = useShopQuery({
    variables: { slug: shop as string },
  });
  const shopId = shopData?.shop?.id!;
  const { data, loading, error, refetch } = useReviewsQuery({
    variables: {
      first: 15,
      shop_id: shopId,
      orderBy: [
        {
          column: QueryReviewsOrderByColumn.CreatedAt,
          order: SortOrder.Desc,
        },
      ],
      page,
    },
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          <h1 className="text-xl font-semibold text-heading">
            {t('form:input-label-reviews')}
          </h1>
        </div>
      </Card>
      <ReviewList
        reviews={data?.reviews as ReviewPaginator}
        onPagination={handlePagination}
        refetch={refetch}
      />
    </>
  );
}
Reviews.authenticate = {
  permissions: adminAndOwnerOnly,
};
Reviews.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
