import Banner from '@/subcomponents/banner.tsx'
import Loading from '@/subcomponents/Loading/loading'
import { Suspense, lazy } from 'react';
import Popularproducts from '@/subcomponents/popularproducts.tsx'

const Knowus = lazy(() => import('@/subcomponents/knowus.tsx'));

const Landingpage = () => {
  return (
    <>
      <Banner />
      <Suspense fallback={<Loading />}>
      <Popularproducts />
      </Suspense>
      {/* lazy components */}
      <Suspense fallback={<Loading />}>
        <Knowus />
      </Suspense>
    </>
  )
}

export default Landingpage
