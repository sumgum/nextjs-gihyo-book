import { Breadcrumbs } from '@mui/material';
import ProductCardListContainer from 'containers/ProductCardListContainer';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import BreadcrumbItem from 'components/atoms/BreadcrumbItem';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import Breadcrumb from 'components/molecules/Breadcrumb';
import FilterGroup from 'components/molecules/FilterGroup';
import Layout from 'components/templates/Layout';
import type { Category, Condition } from 'types';

const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const categoryNameDict: Record<Category, string> = {
  book: '本',
  shoes: '靴',
  clothes: 'トップス',
};

const SearchPage: NextPage = () => {
  const router = useRouter();
  // 商品のカテゴリーをクエリから取得
  const slug: Category[] = Array.isArray(router.query.slug)
    ? (router.query.slug as Category[])
    : [];
  // 商品の状態をクエリから取得
  const conditions = () => {
    if (Array.isArray(router.query.condition)) {
      return router.query.condition as Condition[];
    } else if (router.query.condition) {
      return [router.query.condition as Condition];
    } else {
      return [];
    }
  };

  const handleChange = (selected: string[]) => {
    router.push({
      pathname: router.pathname,
      query: {
        slug,
        condition: selected,
      },
    });
  };

  return (
    <Layout>
      <Box
        paddingLeft={{
          base: 2,
          md: 3,
        }}
        paddingRight={{
          base: 2,
          md: 3,
        }}
        paddingTop={2}
        paddingBottom={2}
      >
        <Box marginBottom={1}>
          <Breadcrumbs>
            <BreadcrumbItem>
              <Link href="/">
                <a>トップ</a>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="search">
                <a>検索</a>
              </Link>
            </BreadcrumbItem>
            {/* パンくずリストを選択したカテゴリから生成 */}
            {slug.slice(0, slug.length - 1).map((category, i) => (
              <BreadcrumbItem key={i}>
                <Link href={`/search/${slug.slice(0, i + 1).join('/')}`}>
                  <a>{categoryNameDict[category] ?? 'Unknown'}</a>
                </Link>
              </BreadcrumbItem>
            ))}
            {slug.length == 0 && <BreadcrumbItem>すべて</BreadcrumbItem>}
            {slug.length > 0 && (
              <BreadcrumbItem>
                {categoryNameDict[slug[slug.length - 1]]}
              </BreadcrumbItem>
            )}
          </Breadcrumbs>
        </Box>
      </Box>
    </Layout>
  );
};

export default SearchPage;
